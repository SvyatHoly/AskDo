module Fastlane
  module Actions
    class ReleaseWalletAction < Action
      def self.run(params)
        next_version = params[:version]

        current_branch = sh("git rev-parse --abbrev-ref HEAD").strip

        if current_branch != "release-#{next_version}"        
          sh("git checkout -b release-#{next_version}")

          other_action.increment_version_number(config_path: 'constants/wallet_config', version: next_version, platform: 'both')

          other_action.git_commit(
            path: ["**/build.gradle", "**/Info.plist"],
            message: "Bump version #{next_version} #️⃣#️⃣",
            skip_git_hooks: true
          )

          if ENV["SHOULD_UPLOAD_TRANSLATIONS"] == "1"
            other_action.crowdin_download
          end

          other_action.push_to_git_remote(
            tags: false
          )
        end

        pr_url = other_action.create_pull_request(
          api_token: params[:api_token],
          repo: "sweatco/sweat-wallet",
          title: "[Skip] Release #{next_version}",
          base: "main",
          labels: "release"
        )

        UI.user_error!("Error while creating a PR") if pr_url.nil?

        other_action.create_wallet_release_ticket(version: next_version)
      end

      #####################################################
      # @!group Documentation
      #####################################################

      def self.description
        "This action helps automate release process"
      end

      def self.details
        "It does several things: 
        creates release branch (`release-*`), 
        bumps version to the next major version (all `Info.plist`s for iOS, `android/app/build.gradle` for Android),
        commits changes,
        prepare PRs,
        creates release Jira ticket
        "
      end

      def self.available_options
        [
          FastlaneCore::ConfigItem.new(
            key: :api_token,
            env_name: "FL_RELEASE_API_TOKEN",
            description: "GitHub API token to create a PR",
            optional: false,
            is_string: true
          ),
          FastlaneCore::ConfigItem.new(
            key: :version,
            env_name: "FL_RELEASE_VERSION",
            description: "Exact release version to use",
            optional: false,
            verify_block: proc { |value|
              UI.user_error!("Should follow version pattern 'MAJOR.MINOR'") unless value.empty? || value.match(/^\d+\.\d+$/)
            }
          )
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
