module Fastlane
  module Actions
    class IncrementVersionNumberAction < Action
      def self.run(params)        
        next_version = params[:version]
        platform = params[:platform]

        increment_ios_version(PLIST_PATHS, next_version) unless platform == 'android'
        increment_android_version(next_version) unless platform == 'ios'
      end

      private 

      def self.increment_ios_version(paths, next_version)
        paths.map do |info_plist_path|
          other_action.set_info_plist_value(
            path: info_plist_path,
            key: IOS_VERSION_KEY,
            value: next_version
          )
        end
      end

      def self.extract_android_version_name(line)
        if line.include?("versionName")
          version_components = line.strip.split(" ")
          version_components[version_components.length - 1].tr("\"","")
        end
      end

      def self.increment_android_version(version_name)
        temp_build_gradle = Tempfile.new("new_version_build.gradle")

        File.foreach(BUILD_GRADLE_PATH) do |line|
          current_version_name = extract_android_version_name(line)

          if !current_version_name.nil?
            new_line = line.sub(current_version_name, version_name)
            temp_build_gradle.puts(new_line)
          else
            temp_build_gradle.puts(line)
          end
        end

        temp_build_gradle.close

        FileUtils.mv(temp_build_gradle, BUILD_GRADLE_PATH)
      end

      #####################################################
      # @!group Documentation
      #####################################################

      def self.description
        "Increment version number for ios and android platforms"
      end

      def self.available_options
        [
          FastlaneCore::ConfigItem.new(
            key: :version,
            env_name: "FL_RELEASE_VERSION",
            description: "Specify the version to set",
            optional: false,
            verify_block: proc { |value|
              UI.user_error!("Should follow version pattern #{VERSION_PATTERN}") unless value.empty? || value.match(VERSION_REGEX)
            }
          ),
          FastlaneCore::ConfigItem.new(key: :platform,
            env_name: "FL_PLATFORM",
            description: "Platform (ios, android, both)",
            optional: false,
            verify_block: proc do |value|
              available_platforms = ["ios", "android", "both"]
              unless available_platforms.include?(value)
                UI.user_error!("Invalid platform '#{value}'. Available platforms are: #{available_platforms.join(', ')}")
              end
            end),
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

      def self.authors
        ["Misha Sitalov"]
      end

      def self.is_supported?(platform)
        true
      end
    end
  end
end
