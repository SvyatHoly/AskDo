module Fastlane
  module Actions
    class RolloutSwtAction < Action
      def self.run(params)
        platform = params[:platform]
        rollout_ios(params) unless platform == 'android'
        rollout_android(params) unless platform == 'ios'
      end

      def self.rollout_ios(params)
        result = other_action.rollout_ios(app_bundle_id:"swc", api_key_path: params[:api_key_path])

        if (result.presence)
          version = result[:version] 
          build_number = result[:build_number]
          UI.message("Notify slack with version #{version} and build number #{build_number}")

          other_action.slack(
            message: "@channel 🚀 *iOS #{version} (#{build_number})* started phased rollout! 🚀\n :warning: Do not forget to unhide markets <https://admin.sweat.team/admin/review_version_configs|here>",
            slack_url: ENV["SLACK_RC_REPORTING_URL"],
            link_names: true,
            default_payloads: [],
            attachment_properties: {color: "good"}
          )
        end
      end

      def self.rollout_android(params)
      end

      #####################################################
      # @!group Documentation
      #####################################################

      def self.description
        "Rollout Sweatcoin"
      end

      def self.available_options
        [
          FastlaneCore::ConfigItem.new(
            key: :api_key_path,
            env_name: "ASC_API_KEY_PATH", # The name of the environment variable
            description: "ASC API key path", # a short description of this parameter
            optional: false
          ),
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
