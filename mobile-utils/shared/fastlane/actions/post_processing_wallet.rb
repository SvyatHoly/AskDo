module Fastlane
  module Actions
    class PostProcessingWalletAction < Action
      
      def self.run(params)
        platform = params[:platform]
        ios_post_processing(params) unless platform == 'android'
        android_post_processing(params) unless platform == 'ios'
      end

      private

      def self.ios_post_processing(params)
        release_notes = params[:release_notes]
        changelog_file_path = File.join("fastlane", "metadata", "ios", "en-GB", "release_notes.txt")

        File.write(changelog_file_path, release_notes) if release_notes && !release_notes.empty?

        changelog = File.read(changelog_file_path)

        # Need to get explicitly because pilot tends to stuck on searcing latest build
        # Github issue closed, but seem not to be fixed yet: https://github.com/fastlane/fastlane/issues/19565
        latest_build_number = other_action.latest_testflight_build_number(api_key_path: params[:asc_api_key_path]).to_s

        other_action.pilot(
          api_key_path: ENV["ASC_API_KEY_PATH"],
          app_platform: "ios",
          changelog: changelog,
          distribute_only: true,
          distribute_external: true,
          build_number: latest_build_number,
          groups: [
            "External"
          ]
        )

        other_action.deliver(
          submit_for_review: true,
          build_number: latest_build_number,
          reject_if_possible: true,
          submission_information: {
            add_id_info_uses_idfa: false
          }
        )
      end

      def self.android_post_processing(params)
        other_action.validate_play_store_json_key(json_key: 'fastlane/google_play_store.json')

        release_notes = params[:release_notes]
        changelog_file_path = File.join("fastlane", "metadata", "android", "en-GB", "changelogs", "default.txt")

        File.write(changelog_file_path, release_notes) if release_notes && !release_notes.empty?

        versions = other_action.google_play_track_version_codes(
          track: "alpha",
          json_key: 'fastlane/google_play_store.json',
          package_name: 'com.sweatwallet'
        )
        version_code = versions[0]
        other_action.supply(
          package_name: 'com.sweatwallet',
          track: 'alpha',
          track_promote_to: 'production',
          skip_upload_aab: true,
          skip_upload_apk: true,
          json_key: 'fastlane/google_play_store.json',
          skip_upload_metadata: true,
          skip_upload_images: true,
          skip_upload_screenshots: true,
          skip_upload_changelogs: false,
          version_code: version_code,
          rollout: '0.05'
        )
      end

      #####################################################
      # @!group Documentation
      #####################################################

      def self.description
        "Do post-processing actions for specific Wallet EXTERNAL build"
      end

      def self.details
        "Takes an optional argument with release notes at the start. If passed, action will replace the text in fastlane/metadata/ios/en-GB/release_notes.txt and use it or use default text"
      end

      def self.available_options
        [
          FastlaneCore::ConfigItem.new(key: :asc_api_key_path,
                                       env_name: "ASC_API_KEY_PATH",
                                       optional: false),
          FastlaneCore::ConfigItem.new(key: :release_notes,
                                        env_name: "FL_RELEASE_NOTES",
                                        description: "Release notes for new version",
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
