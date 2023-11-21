module Fastlane
  module Actions
    class ReportStatisticsAction < Action
      def self.run(params)
        file_path = params[:file_path].presence
        if file_path && File.exist?(file_path)
          value = `ls -l #{file_path} | awk '{print $5}'`.strip
        else
          value = params[:value].presence
        end
        
        if value.blank?
          UI.error('No value passed to report') 
          return false 
        end

        sh("echo \"##teamcity[buildStatisticValue key='#{params[:key]}' value='#{value}']\"")
      end

      #####################################################
      # @!group Documentation
      #####################################################

      def self.description
        "Report statistics to TeamCity"
      end

      def self.details
        "Report file size or custom value into TeamCity statistics"
      end

      def self.available_options
        [
          FastlaneCore::ConfigItem.new(key: :key,
                                       env_name: "FL_REPORT_STATISTICS_KEY",
                                       optional: false),
          FastlaneCore::ConfigItem.new(key: :value,
                                       env_name: "FL_REPORT_STATISTICS_VALUE",
                                       optional: true),
          FastlaneCore::ConfigItem.new(key: :file_path,
                                       description: "File to calculate size and report",
                                       env_name: "FL_REPORT_STATISTICS_FILE_PATH",
                                       optional: true)                              
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
