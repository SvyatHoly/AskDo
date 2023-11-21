module Fastlane
  module Actions
    class CommentJiraIssueAction < Action
      def self.find_issue_by_key(issue_key, client)
        UI.message("Searching jira issue by key")
        puts issue_key
        return if issue_key.nil? || issue_key.empty?

        begin
          issue = client.Issue.find(issue_key)
          UI.message("Found issue: #{issue.key} - #{issue.summary}")
          return issue
        rescue JIRA::HTTPError => e
          UI.message("Failed to find issue: #{e.message}")
          return
        end
      end

      def self.find_issue_by_name(project_key, issue_name, client)
        UI.message("Searching jira issue by name")
        return if project_key.nil? || project_key.empty? || issue_name.nil? || issue_name.empty?
          # Search for JIRA issue containing given name in specified project        
          query = "project = #{project_key} AND summary ~ \"#{issue_name}\""
          issues = client.Issue.jql(query)

          if issues.empty?
            UI.message("No JIRA issue found in project #{project_key} containing \"#{issue_name}\"")
            return
          end

          return issues.first
      end

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

        client = JIRA::Client.new(options)

        issue = find_issue_by_key(params[:issue_key], client) || find_issue_by_name(params[:project_key], params[:issue_name], client)
        UI.error("No isuue find. Check input parameters") && return if issue.nil? 

        comment_body = params[:comment_body]
        issue.comments.build.save!(body: comment_body)

        UI.success("Comment added to JIRA issue #{issue.key}")
      end

      #####################################################
      # @!group Documentation
      #####################################################

      def self.description
        "Add a comment to a JIRA issue containing a given name in a specified project or specific issue id"
      end

      def self.available_options
        [
          FastlaneCore::ConfigItem.new(
            key: :issue_key,
            description: "Jra issue key",
            optional: true,
          ),
          FastlaneCore::ConfigItem.new(
            key: :project_key,
            description: "The project key of the Jira project",
            optional: true,
          ),
          FastlaneCore::ConfigItem.new(
            key: :issue_name,
            description: "The name of Jira issue to find",
            optional: true
          ),    
          FastlaneCore::ConfigItem.new(
            key: :comment_body,
            description: "Body of comment to add to JIRA issue",
            verify_block: proc do |value|
              UI.user_error!("No comment body given") unless value && !value.empty?
            end
          ),               
          FastlaneCore::ConfigItem.new(
            key: :username,
            description: "The username to use for Jira authentication",
            env_name: "JIRA_USERNAME",
            sensitive: true,
            optional: false
          ),
          FastlaneCore::ConfigItem.new(
            key: :api_token,
            description: "The API token to use for Jira authentication",
            env_name: "JIRA_API_TOKEN",
            sensitive: true,
            optional: false
          ),
          FastlaneCore::ConfigItem.new(
            key: :site,
            description: "The Jira site URL",
            env_name: "JIRA_SITE",
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
