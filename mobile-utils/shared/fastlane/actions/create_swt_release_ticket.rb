module Fastlane
  module Actions
    class CreateSwtReleaseTicketAction < Action
      def self.run(params)
        changelog = other_action.changelog_generator
        key = other_action.create_jira_issue(
          project_key: 'LOG',
          issue_type: 'Release',
          summary: params[:platform] + ' ' + params[:version], 
          description: changelog, 
          extra_fields: {'customfield_10089': {
            'value' => params[:platform]
          }}
        )
      
        puts "Created Jira ticket #{ENV["JIRA_SITE"]}/browse/#{key}"
      
        other_action.slack(
          message: "#{params[:platform]} #{params[:version]} release ticket: #{ENV["JIRA_SITE"]}/browse/#{key}",
          slack_url: ENV["SLACK_RC_REPORTING_URL"],
          link_names: true,
          default_payloads: [],
          attachment_properties: { color: "#0000FF" }
        )
      end

      #####################################################
      # @!group Documentation
      #####################################################

      def self.description
        "Generate changelog, create release Jira issue and notify #rc channel"
      end

      def self.available_options
        [
          FastlaneCore::ConfigItem.new(key: :platform,
                                      description: "Release platform",
                                      verify_block: proc do |value|
                                        accepted_platforms = ['iOS', 'Android']
                                        unless accepted_platforms.include?(value)
                                          UI.user_error!("Invalid platform '#{value}'. Only #{accepted_platforms.join(' or ')} are supported.")
                                        end
                                      end),
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
