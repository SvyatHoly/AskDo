module Fastlane
  module Actions
    class ReportReleaseStatusAction < Action
      def self.run(params)
        platform = params[:platform]
        report_ios(params) unless platform == 'android'
        report_android(params) unless platform == 'ios'
      end

      def self.report_ios(params)
        if (api_token = Spaceship::ConnectAPI::Token.from(filepath: params[:api_key_path]))
          UI.message("Creating authorization token for App Store Connect API")
          Spaceship::ConnectAPI.token = api_token
        elsif
          UI.message("Can not create token for App Store Connect API")
        end

        app = Spaceship::ConnectAPI::App.find(params[:bundle_id])

        last_version = app.get_app_store_versions.first
        state = last_version.app_store_state
        build_number = last_version.build.version

        version = build_number ? "#{last_version.version_string} (#{build_number})" : last_version.version_string
        UI.message("version: #{version}")

        phased_release = last_version.fetch_app_store_version_phased_release

        current_day_number = phased_release.current_day_number
        UI.message("current_day_number: #{current_day_number}")
        phased_release_state = phased_release.phased_release_state
        UI.message("phased_release_state: #{phased_release_state}")

        other_action.slack(
          message: ":green_apple: *iOS relese state*:\nVersion: *#{version}*\nState: *#{state}*\nPhased release state: *#{phased_release_state}*\nRollout percentage: *#{map_day_to_percentage(current_day_number)}*",
          slack_url: ENV["SLACK_RC_REPORTING_URL"],
          link_names: true,
          default_payloads: [],
          attachment_properties: {color: "green"}
        )
      end

      def self.map_day_to_percentage(day)
        if day < 7
        case day
          when 0
            '0%'
          when 1
            '1%'
          when 2
            '2%'
          when 3
            '5%'
          when 4
            '10%'
          when 5
            '20%'
          when 6
            '50%'
          end
        else
          '100%'
        end
      end

      def self.report_android(params)
        require 'google/apis/androidpublisher_v3'
        require 'googleauth'

        credentials = Google::Auth::ServiceAccountCredentials.make_creds(
          json_key_io: File.open(params[:gp_api_key_path]),
          scope: 'https://www.googleapis.com/auth/androidpublisher'
        )
        
        service = Google::Apis::AndroidpublisherV3::AndroidPublisherService.new
        service.authorization = credentials

        package_name = params[:package_name]
        track = 'production'

        edit = service.insert_edit(package_name)
        edit_id = edit.id 

        releases = service.list_edit_tracks(
          package_name, edit_id
        )

        track_releases = releases.tracks.find { |track| track.track == 'production' }
        
        if track_releases
          latest_release = track_releases.releases&.max_by { |release| release.version_codes.first.to_i }

          if latest_release
            status = latest_release.status

            rollout_percentage = 
              if (status == 'draft' || status == 'inProgress') &&  latest_release.user_fraction.presence
                sprintf("%.0f%%", latest_release.user_fraction * 100) 
              elsif status == 'completed'
                '100%'
              else
                'n/a'
              end

            version_code = latest_release.version_codes.first
            version = version_code ? "#{latest_release.name} (#{version_code})" : latest_release.name

            other_action.slack(
              message: ":robot_face: *Android relese state*:\nVersion: *#{version}*\nState: *#{status.upcase}*\nRollout percentage: *#{rollout_percentage}*\n",
              slack_url: ENV["SLACK_RC_REPORTING_URL"],
              link_names: true,
              default_payloads: [],
              attachment_properties: {color: "yellow"}
            )
          else
            UI.user_error!("No releases found in the specified track")
          end
        else
          UI.user_error!("No releases found in the specified track")
        end
      end

      #####################################################
      # @!group Documentation
      #####################################################

      def self.description
        'Report release status to slack'
      end

      def self.available_options
        [
          
            FastlaneCore::ConfigItem.new(
              key: :api_key_path,
              env_name: "ASC_API_KEY_PATH", # The name of the environment variable
              description: "ASC API key path", # a short description of this parameter
              optional: false
            ),
            FastlaneCore::ConfigItem.new(key: :bundle_id,
              env_name: "FL_BUNDLE_ID",
              description: "Bundle id of the app on Appstore",
              is_string: true,
              optional: true),
            FastlaneCore::ConfigItem.new(key: :gp_api_key_path,
              env_name: "GP_API_KEY_PATH",
              description: "Path to the JSON key file for authentication",
              is_string: true,
              optional: true),
            FastlaneCore::ConfigItem.new(key: :package_name,
              env_name: "FL_PACKAGE_NAME",
              description: "Package name of the app on Google Play",
              is_string: true,
              optional: true),
            FastlaneCore::ConfigItem.new(key: :platform,
              env_name: "FL_PLATFORM",
              description: "Platform (ios, android, both)",
              optional: false,
              verify_block: proc do |value|
                available_platforms = ["ios", "android", "both"]
                unless available_platforms.include?(value)
                  UI.user_error!("Invalid platform '#{value}'. Available platforms are: #{available_platforms.join(', ')}")
                end
              end)
          
        ]
      end


      def self.is_supported?(platform)
        true
      end
    end
  end
end
