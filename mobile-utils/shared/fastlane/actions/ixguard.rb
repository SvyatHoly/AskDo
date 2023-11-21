require "mkmf"

module Fastlane
  module Actions
    module SharedValues
      OBFUSCATED_XCARCHIVE_PATH = :OBFUSCATED_XCARCHIVE_PATH
    end

    class IxguardAction < Action
      IXGUARD = "ixguard"

      def self.run(params)
        if !find_executable(IXGUARD)
          UI.error "#{IXGUARD} not found"
        end

        archive_path = params[:archive_path]
        if !archive_path
          UI.user_error!("No xcarchive specified")
        end

        if !File.exists?(archive_path)
          UI.user_error!("xcarchive '#{archive_path}' doesn't exist")
        end

        output_archive_path = params[:output_archive_path]
        if !output_archive_path
          UI.user_error!("No output xcarchive path specified")
        end

        config_file_path = params[:config]

        sh IXGUARD, "-config", config_file_path, "-o", output_archive_path, archive_path

        Actions.lane_context[SharedValues::OBFUSCATED_XCARCHIVE_PATH] = output_archive_path
        Actions.lane_context[SharedValues::DSYM_OUTPUT_PATH] = File.join(File.dirname(output_archive_path), "dSYMs")
      end

      def self.description
        "Run iXGuard on .xcarchive"
      end

      def self.available_options
        [
          FastlaneCore::ConfigItem.new(key: :archive_path,
                                       description: "Path to original .xcarchive",
                                       default_value: Actions.lane_context[SharedValues::XCODEBUILD_ARCHIVE],
                                       type: String,
                                       optional: true),
          FastlaneCore::ConfigItem.new(key: :output_archive_path,
                                       description: "Path to obfuscated .xcarchive",
                                       type: String,
                                       optional: false),
          FastlaneCore::ConfigItem.new(key: :config,
                                       description: "Path to configuration file",
                                       default_value: File.join(ENV["PWD"], "ixguard.yml"),
                                       type: String,
                                       optional: true)
        ]
      end

      def self.is_supported?(platform)
        platform == :ios
      end
    end
  end
end
