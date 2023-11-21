module Fastlane
  module Actions
    class PostProcessingSwtAction < Action
      def self.run(params)
        platform = params[:platform]
        ios_post_processing(params) unless platform == 'android'
        android_post_processing(params) unless platform == 'ios'
      end

      def self.ios_post_processing(params)
        changelog = File.read("fastlane/metadata/en-GB/release_notes.txt")
        build_number = params[:build_number].presence ? params[:build_number] : other_action.latest_testflight_build_number(version:params[:app_version], api_key_path: params[:api_key_path]).to_s
        
        # Submit the build for Beta review, add external testers groups
        other_action.pilot(
          api_key_path: params[:api_key_path],
          app_platform: "ios",
          changelog: changelog,
          distribute_only: true,
          distribute_external: true,
          build_number: build_number,
          groups: [
            "HR",
            "External Testers"
          ]
        )
    
        # Submit the app for AppStore review
        other_action.deliver(
          submit_for_review: true,
          skip_metadata: true,
          skip_screenshots: true,
          build_number: build_number,
          reject_if_possible: true,
          submission_information: {
            add_id_info_uses_idfa: true
          }
        )

        other_action.slack(
          message: "@channel @qa-product 🚀 *iOS #{params[:app_version]} (#{build_number})* has been submitted for review \n :warning: Do not forget to hide markets <https://admin.sweat.team/admin/review_version_configs|here>",
          slack_url: ENV["SLACK_RC_REPORTING_URL"],
          link_names: true,
          default_payloads: [],
          attachment_properties: {color: "good"}
        )
      end
      
      def self.android_post_processing(params)
        json_key = 'fastlane/google_play_store.json'
        package_name = 'in.sweatco.app'

        other_action.validate_play_store_json_key(json_key: json_key)

        version_code = options[:version_code].presence ? options[:version_code] : other_action.google_play_track_version_codes(
          track: "alpha",
          json_key: json_key,
          package_name: package_name
        )[0]

        other_action.supply(
          package_name: package_name,
          track: 'alpha',
          track_promote_to: 'production',
          track_promote_release_status: 'draft',
          skip_upload_aab: true,
          skip_upload_apk: true,
          json_key: json_key,
          skip_upload_metadata: true,
          skip_upload_images: true,
          skip_upload_screenshots: true,
          skip_upload_changelogs: false,
          version_code: version_code,
          rollout: '0.1'
        )
      end

      #####################################################
      # @!group Documentation
      #####################################################

      def self.description
        "Post-processing actions for specific EXTERNAL build"
      end

      def self.available_options
        [
          FastlaneCore::ConfigItem.new(key: :api_key_path,
                                      env_name: "ASC_API_KEY_PATH",
                                      description: "ASC api key path", 
                                      optional: false),
          FastlaneCore::ConfigItem.new(key: :app_version,
                                      env_name: "FL_APP_VERSION",
                                      description: "App version", 
                                      optional: false,
                                      verify_block: proc { |value|
                                        UI.user_error!("Should follow version pattern 'MAJOR.MINOR'") unless value.empty? || value.match(/^\d+\.\d+$/)
                                      }),
          FastlaneCore::ConfigItem.new(key: :build_number,
                                      env_name: "FL_BUILD_NUMBER",
                                      description: "Explicit build number. If not defined will be fetched using `latest_testflight_build_number`", 
                                      optional: true),
          FastlaneCore::ConfigItem.new(key: :version_code,
                                      env_name: "FL_VERSION_CODE",
                                      description: "Explicit version code for android app. If not defined last build from alpha trek will be using", 
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

      def self.authors
        ["Misha Sitalov"]
      end

      def self.is_supported?(platform)
        true
      end
    end
  end
end
