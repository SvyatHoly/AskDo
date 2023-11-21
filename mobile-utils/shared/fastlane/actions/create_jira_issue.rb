module Fastlane
  module Actions
    class CreateJiraIssueAction < Action
      def self.run(params)
        Actions.verify_gem!('jira-ruby')
        require 'jira-ruby'

        options = {
          username: params[:username],
          password: params[:api_token],
          site: params[:site],
          context_path: '',
          auth_type: :basic
        }
        fields = {
          'project': {
            'key': params[:project_key]
          },
          'summary': params[:summary],
          'description': params[:description],
          'issuetype': {
            'name': params[:issue_type]
          }
        }
        fields = fields.merge(params[:extra_fields])

        client = JIRA::Client.new(options)
        issue = client.Issue.build
        issue.save({'fields': fields })
        issue.key
      end

      def self.description
        "Creates a Jira issue"
      end

      def self.authors
        ["Misha Sitalov"]
      end

      def self.available_options
        [
          FastlaneCore::ConfigItem.new(key: :project_key,
                                       description: "The project key of the Jira project",
                                       verify_block: proc do |value|
                                         UI.user_error!("No project key provided") unless value and !value.empty?
                                       end),
          FastlaneCore::ConfigItem.new(key: :issue_type,
                                       description: "The issue type of the Jira issue",
                                       verify_block: proc do |value|
                                         UI.user_error!("No issue type provided") unless value and !value.empty?
                                       end),
          FastlaneCore::ConfigItem.new(key: :summary,
                                       description: "The summary of the Jira issue",
                                       verify_block: proc do |value|
                                         UI.user_error!("No summary provided") unless value and !value.empty?
                                       end),
          FastlaneCore::ConfigItem.new(key: :description,
                                       description: "The description of the Jira issue",
                                       verify_block: proc do |value|
                                         UI.user_error!("No description provided") unless value and !value.empty?
                                       end),
          FastlaneCore::ConfigItem.new(key: :extra_fields,
                                        description: "Extra fields of the Jira issue",
                                        type: Hash,
                                        default_value: {}),                          
          FastlaneCore::ConfigItem.new(key: :username,
                                        description: "The username to use for Jira authentication",
                                        env_name: "JIRA_USERNAME",
                                        sensitive: true,
                                        optional: false),
          FastlaneCore::ConfigItem.new(key: :api_token,
                                        description: "The API token to use for Jira authentication",
                                        env_name: "JIRA_API_TOKEN",
                                        sensitive: true,
                                        optional: false),
          FastlaneCore::ConfigItem.new(key: :site,
                                        description: "The Jira site URL",
                                        env_name: "JIRA_SITE")
        ]
      end

      def self.is_supported?(platform)
        true
      end
    end
  end
end
