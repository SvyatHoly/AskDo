module Fastlane
  module Actions
    class CreateWalletReleaseTicketAction < Action
      def self.run(params)
        changelog = generate_changelog

        puts(changelog)
        key = other_action.create_jira_issue(
          project_key: 'OX',
          issue_type: 'RC',
          summary: 'Release ' + params[:version], 
          description: changelog
        )
      
        puts "Created Jira ticket #{ENV["JIRA_SITE"]}/browse/#{key}"
      
        other_action.slack(
          message: "Release #{params[:version]} Jira ticket: #{ENV["JIRA_SITE"]}/browse/#{key}",
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
        "Generate changelog, create release Jira issue and notify #rc channel"
      end

      def self.available_options
        [
          FastlaneCore::ConfigItem.new(key: :version,
                                      description: "The version to include in the release ticket summary",
                                      optional: false)
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
