module Fastlane
  module Actions
    class ReleaseAction < Action
      def self.run(params)
        require_relative(params[:config_path])

        next_version = params[:version]
        current_branch = sh("git rev-parse --abbrev-ref HEAD").strip

        if current_branch != "release-#{next_version}"        
          other_action.increment_version_number(version: next_version, platform: 'both', config_path: params[:config_path])

          sh("git checkout -b release-#{next_version}")

          other_action.git_commit(
            path: ["**/build.gradle", "**/Info.plist"],
            message: "Bump version #{next_version} #️⃣#️⃣",
            skip_git_hooks: true
          )

          if ENV["SHOULD_DOWNLOAD_TRANSLATIONS"] == "1"
            # Download transaltions from Crowdin and commit them
            other_action.crowdin_download(config_path: params[:config_path])
          end

          other_action.push_to_git_remote(
            tags: false
          )
        end

        pr_url = other_action.create_pull_request(
          api_token: params[:api_token],
          repo: REPO,
          title: "[Skip] Release #{next_version}",
          base: "main",
          labels: "release"
        )

        UI.user_error!("Error while creating a PR") if pr_url.nil?

        changelog = generate_changelog
        UI.message("changelog:\n#{changelog}")

        key = other_action.create_jira_issue(
          project_key: PROJECT_KEY,
          issue_type: ISSUE_TYPE,
          summary: 'Release ' + params[:version], 
          description: changelog
        )

        UI.message("Created Jira ticket #{ENV["JIRA_SITE"]}/browse/#{key}")

        other_action.slack(
          message: "#{params[:version]} release ticket: #{ENV["JIRA_SITE"]}/browse/#{key}",
          slack_url: ENV["SLACK_RC_REPORTING_URL"],
          link_names: true,
          default_payloads: [],
          attachment_properties: { color: "#0000FF" }
        )
      end

      private

      def self.generate_changelog
        last_release_tag = `git describe --abbrev=0 --tags`.strip
        base = `git rev-list -n 1 #{last_release_tag}`.strip
        head = `git merge-base main HEAD`.strip
        changelog = `git log --merges #{base}...#{head} --pretty=format:"• %b - (%an)"`.strip

        return format_to_jira(changelog)
      end

      def self.format_to_jira(changelog_markdown)
        "{panel:title=Changelog}
        {noformat}
        #{changelog_markdown}
        {noformat}
        {panel}"
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
            description: "Specify the version to set",
            optional: false,
            verify_block: proc { |value|
              UI.user_error!("Should follow version pattern #{VERSION_PATTERN}") unless value.empty? || value.match(VERSION_REGEX)
            }
          ),
          FastlaneCore::ConfigItem.new(
            key: :config_path,
            env_name: "FL_CONFIG_PATH",
            description: "Path to config with constants",
            type: String,
            optional: false
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
