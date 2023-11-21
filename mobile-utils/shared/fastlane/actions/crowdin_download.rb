module Fastlane
  module Actions
    class CrowdinDownloadAction < Action
      def self.run(params)
        sh "crowdin download -T #{params[:api_token]}"

        has_changes = sh("git status --porcelain translations/").strip != ''
        puts(has_changes)

        if has_changes
          other_action.git_commit(
            path: TRANSLATIONS_PATH,
            message: "Update transaltions",
            skip_git_hooks: true
          )
        elsif 
          UI.message("No translation updates")
        end
      end

      #####################################################
      # @!group Documentation
      #####################################################

      def self.description
        'Download translations from crowdin and commit changes'
      end

      def self.available_options
        [
          FastlaneCore::ConfigItem.new(
            key: :api_token,
            env_name: 'CROWDIN_API_TOKEN',
            description: 'API Token for Crowdin',
            optional: false,
            verify_block: proc do |value|
              unless value && !value.empty?
                UI.user_error!("No API token for CrowdinDownloadAction given, pass using `api_token: 'token'`")
              end
            end
          ),
          FastlaneCore::ConfigItem.new(
            key: :config_path,
            env_name: "FL_CONFIG_PATH",
            description: "Path to config with constants",
            type: String,
            optional: false,
            verify_block: proc { |value|
              require_relative(value)
            }
          )
        ]
      end

      def self.is_supported?(platform)
        true
      end
    end
  end
end
