require "tempfile"
require "fileutils"
require "active_support/core_ext/object/blank.rb"

module Fastlane
  module Actions
    class ReleaseSwtAction < Action
      IOS_VERSION_KEY = "CFBundleShortVersionString"
      BUILD_GRADLE_PATH = "android/app/build.gradle"

      def self.run(params)
        release_android(params)
        release_ios(params)
      end

      def self.release_android(params)
        current_commit = other_action.last_git_commit

        other_action.reset_git_repo(
          force: true,
          skip_clean: true
        )

        project_version = get_version_name(BUILD_GRADLE_PATH)

        latest_unmerged_version = latest_unmerged_version("android/release-*")

        version_to_bump = project_version.to_f > latest_unmerged_version.to_f ? project_version : latest_unmerged_version

        next_version = params[:android_version].presence || get_next_version(version_to_bump, params[:type])

        sh("git checkout -b android/release-#{next_version}")

        increment_version_name(BUILD_GRADLE_PATH, next_version)

        other_action.git_commit(
          path: "**/build.gradle",
          message: "Bump version #{next_version} #️⃣#️⃣",
          skip_git_hooks: true
        )

        other_action.push_to_git_remote(
          tags: false
        )

        pr_url = other_action.create_pull_request(
          api_token: params[:api_token],
          repo: "sweatco/sweatcoin-mobile",
          title: "[Skip] Android release #{next_version}",
          base: "main",
          labels: "release"
        )

        UI.user_error!("Error while creating a PR") if pr_url.nil?

        sh("git checkout #{current_commit[:commit_hash]}")

        other_action.create_swt_release_ticket(version: "#{next_version}", platform: "Android")
      end

      def self.release_ios(params)
        current_commit = other_action.last_git_commit

        other_action.reset_git_repo(
          force: true,
          skip_clean: true
        )

        project_version = other_action.get_info_plist_value(
          path: "ios/swc/Info.plist",
          key: IOS_VERSION_KEY
        )

        latest_unmerged_version = latest_unmerged_version("ios/release-*")

        version_to_bump = project_version.to_f > latest_unmerged_version.to_f ? project_version : latest_unmerged_version

        next_version = params[:ios_version].presence || get_next_version(version_to_bump, params[:type])

        sh("git checkout -b ios/release-#{next_version}")

        [
          "ios/Widget\ Extension/Info.plist",
          "ios/intents-extension/Info.plist",
          "ios/notification-service-extension/Info.plist",
          "ios/swc/Info.plist",
          "ios/watch-extension/Info.plist",
          "ios/watch-intents/Info.plist",
          "ios/watch/Info.plist",
        ].map do |info_plist_path|
          other_action.set_info_plist_value(
            path: info_plist_path,
            key: IOS_VERSION_KEY,
            value: next_version
          )
        end

        other_action.git_commit(
          path: "**/Info.plist",
          message: "Bump version #{next_version} #️⃣#️⃣",
          skip_git_hooks: true
        )

        other_action.push_to_git_remote(
          tags: false
        )

        pr_url = other_action.create_pull_request(
          api_token: params[:api_token],
          repo: "sweatco/sweatcoin-mobile",
          title: "[Skip] iOS release #{next_version}",
          base: "main",
          labels: "release"
        )

        UI.user_error!("Error while creating a PR") if pr_url.nil?

        sh("git checkout #{current_commit[:commit_hash]}")

        other_action.create_swt_release_ticket(version: "#{next_version}", platform: "iOS")
      end

      def self.latest_unmerged_version(pattern)
        # Gets branchs names from origin which starts from specific pattern
        branches = sh("git ls-remote --heads origin #{pattern} | awk '{ print $2; }'").strip.split("\n")
        # Looks just for numbers after 'release-' prefix, cut off empty results and map to floats
        versions = branches.map { |b| b[/(?<=release-)\d+\.\d+$/] }.compact.map(&:to_f)
        # Get max value and map back to string if presented as we need a string later
        versions.max&.to_s
      end

      # Android helpers to avoid third-party tools usage

      def self.extract_version_name(line)
        if line.include?("versionName")
          version_components = line.strip.split(" ")
          version_components[version_components.length - 1].tr("\"","")
        end
      end

      def self.get_version_name(build_gradle_path)
        version_name = nil

        File.foreach(build_gradle_path).each do |line|
          version_name = extract_version_name(line)
          break if !version_name.nil? 
        end

        version_name
      end

      def self.increment_version_name(build_gradle_path, version_name)
        temp_build_gradle = Tempfile.new("new_version_build.gradle")

        File.foreach(build_gradle_path) do |line|
          current_version_name = extract_version_name(line)

          if !current_version_name.nil?
            new_line = line.sub(current_version_name, version_name)
            temp_build_gradle.puts(new_line)
          else
            temp_build_gradle.puts(line)
          end
        end

        temp_build_gradle.close

        FileUtils.mv(temp_build_gradle, build_gradle_path)
      end

      def self.get_next_version(current_version, bump_type)
        version_array = current_version.split(".").map(&:to_i)

        case bump_type
        when "major"
          version_array[0] = version_array[0] + 1
          version_array[1] = 0 if version_array[1]
        when "minor"
          version_array[1] = version_array[1] + 1
        end

        version_array.join(".")
      end

      #####################################################
      # @!group Documentation
      #####################################################

      def self.description
        "This action helps automate RC cutting for CI to prepare release trains"
      end

      def self.details
        "It does several things: 
        creates release branch (`ios/release-*` for iOS, `android/release-*` for Android), 
        bumps version to the next major version (all `Info.plist`s for iOS, `android/app/build.gradle` for Android),
        commits changes,
        prepare PRs
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
            key: :type,
            env_name: "FL_RELEASE_TYPE",
            description: "Type of release. Should be `major` to bump version before the dot, `minor` otherwise",
            optional: true,
            default_value: "major",
            verify_block: proc { |value|
              UI.user_error!("Available values are 'minor' and 'major'") unless ["minor", "major"].include?(value)
            }
          ),
          FastlaneCore::ConfigItem.new(
            key: :ios_version,
            env_name: "FL_RELEASE_IOS_VERSION",
            description: "Exact iOS release version to use",
            optional: true,
            verify_block: proc { |value|
              UI.user_error!("Should follow version pattern 'MAJOR.MINOR'") unless value.empty? || value.match(/^\d+\.\d+$/)
            }
          ),
          FastlaneCore::ConfigItem.new(
            key: :android_version,
            env_name: "FL_RELEASE_ANDROID_VERSION",
            description: "Exact Android release version to use",
            optional: true,
            verify_block: proc { |value|
              UI.user_error!("Should follow version pattern 'MAJOR.MINOR'") unless value.empty? || value.match(/^\d+\.\d+$/)
            }
          )
        ]
      end

      def self.authors
        ["Igor Sova"]
      end

      def self.is_supported?(platform)
        true # Runs for any platform since only prepare branches
      end
    end
  end
end
