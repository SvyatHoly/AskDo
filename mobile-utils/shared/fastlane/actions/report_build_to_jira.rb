module Fastlane
  module Actions
    class ReportBuildToJiraAction < Action
      def self.run(params)
        jira_task_id = params[:jira_task_id]

        other_action.comment_jira_issue(
          issue_key: params[:jira_task_id], 
          comment_body: "*#{params[:platform]} (#{params[:build_id]})* is ready"
        )
      end

      def self.description
        "Add comment to provided Jira issue with a build number"
      end

      def self.available_options
        [
          FastlaneCore::ConfigItem.new(
            key: :jira_task_id,
            description: "JIRA task ID",
            optional: false,
            type: String
          ),
          FastlaneCore::ConfigItem.new(
            key: :build_id,
            description: "Build ID",
            optional: false,
            type: String
          ),
          FastlaneCore::ConfigItem.new(
            key: :platform,
            description: "Platform",
            optional: false,
            type: String
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
