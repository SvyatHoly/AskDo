# This action mostly copy-pasted from https://github.com/fastlane/fastlane/edit/master/fastlane/lib/fastlane/actions/app_store_build_number.rb
# The main reason to modify - we need just a version number of the last editing version (not a build number) to be sure if we should use 'deliver' or not
# IMPORTANT: If there is a version currently being edited or waiting for review, the function returns nil instead.

module Fastlane
  module Actions
    module SharedValues
      CHECK_APP_STORE_VERSION_CUSTOM_VALUE = :CHECK_APP_STORE_VERSION_CUSTOM_VALUE
    end

    class CheckAppStoreVersionAction < Action
      def self.run(params)
        get_version_info(params)
      end
      
      def self.get_version_info(params)
        require "spaceship"

        # Prompts select team if multiple teams and none specified
        if (api_token = Spaceship::ConnectAPI::Token.from(filepath: params[:api_key_path]))
          UI.message("Creating authorization token for App Store Connect API")
          Spaceship::ConnectAPI.token = api_token
        elsif !Spaceship::ConnectAPI.token.nil?
          UI.message("Using existing authorization token for App Store Connect API")
        else
          # Username is now optional since addition of App Store Connect API Key
          # Force asking for username to prompt user if not already set
          params.fetch(:username, force_ask: true)

          UI.message("Login to App Store Connect (#{params[:username]})")
          Spaceship::ConnectAPI.login(params[:username], use_portal: false, use_tunes: true, tunes_team_id: params[:team_id], team_name: params[:team_name])
          UI.message("Login successful")
        end

        app = Spaceship::ConnectAPI::App.find(params[:app_identifier])
        UI.user_error!("Could not find an app on App Store Connect with app_identifier: #{params[:app_identifier]}") unless app

        edit_version = app.get_edit_app_store_version(platform: params[:platform])
        platform_type = params[:platform].nil? ? "any" : params[:platform]

        if edit_version
          UI.message("There's edit version (#{edit_version.version_string}) on #{platform_type} platform, falling back to 'nil' value")
          return nil 
        end
        
        version = app.get_live_app_store_version(platform: params[:platform])

        if version
          version_string = version.version_string
          UI.message("Latest live version on #{platform_type} platform: #{version_string}")
          return version_string
        else
          UI.message("There's no live version on #{platform_type} platform, falling back to 'nil' value")
          return nil
        end
      end

      #####################################################
      # @!group Documentation
      #####################################################

      def self.description
        "A short description with <= 80 characters of what this action does"
      end

      def self.available_options
        user = CredentialsManager::AppfileConfig.try_fetch_value(:itunes_connect_id)
        user ||= CredentialsManager::AppfileConfig.try_fetch_value(:apple_id)
        [
          FastlaneCore::ConfigItem.new(
            key: :api_key_path,
            env_names: ["CHECK_APP_STORE_VERSION_API_KEY_PATH", "APP_STORE_CONNECT_API_KEY_PATH"],
            description: "Path to your App Store Connect API Key JSON file (https://docs.fastlane.tools/app-store-connect-api/#using-fastlane-api-key-json-file)",
            optional: true,
            conflicting_options: [:api_key],
            verify_block: proc do |value|
              UI.user_error!("Couldn't find API key JSON file at path '#{value}'") unless File.exist?(value)
            end
          ),
          FastlaneCore::ConfigItem.new(
            key: :api_key,
            env_names: ["CHECK_APP_STORE_VERSION_API_KEY", "APP_STORE_CONNECT_API_KEY"],
            description: "Your App Store Connect API Key information (https://docs.fastlane.tools/app-store-connect-api/#using-fastlane-api-key-hash-option)",
            type: Hash,
            default_value: Fastlane::Actions.lane_context[Fastlane::Actions::SharedValues::APP_STORE_CONNECT_API_KEY],
            default_value_dynamic: true,
            optional: true,
            sensitive: true,
            conflicting_options: [:api_key_path]
          ),
          FastlaneCore::ConfigItem.new(
            key: :app_identifier,
            short_option: "-a",
            env_name: "FASTLANE_APP_IDENTIFIER",
            description: "The bundle identifier of your app",
            code_gen_sensitive: true,
            default_value: CredentialsManager::AppfileConfig.try_fetch_value(:app_identifier),
            default_value_dynamic: true
          ),
          FastlaneCore::ConfigItem.new(
            key: :username,
            short_option: "-u",
            env_name: "ITUNESCONNECT_USER",
            description: "Your Apple ID Username",
            optional: true,
            default_value: user,
            default_value_dynamic: true
          ),
          FastlaneCore::ConfigItem.new(key: :team_id,
            short_option: "-k",
            env_name: "CHECK_APP_STORE_VERSION_TEAM_ID",
            description: "The ID of your App Store Connect team if you're in multiple teams",
            optional: true,
            skip_type_validation: true, # as we also allow integers, which we convert to strings anyway
            code_gen_sensitive: true,
            default_value: CredentialsManager::AppfileConfig.try_fetch_value(:itc_team_id),
            default_value_dynamic: true,
            verify_block: proc do |value|
              ENV["FASTLANE_ITC_TEAM_ID"] = value.to_s
            end
          ),
          FastlaneCore::ConfigItem.new(key: :platform,
            short_option: "-j",
            env_name: "APPSTORE_PLATFORM",
            description: "The platform to use (optional)",
            optional: true,
            default_value: "ios",
            verify_block: proc do |value|
              UI.user_error!("The platform can only be ios, appletvos, or osx") unless %('ios', 'appletvos', 'osx').include?(value)
            end
          ),
          FastlaneCore::ConfigItem.new(key: :team_name,
            short_option: "-e",
            env_name: "CHECK_APP_STORE_VERSION_TEAM_NAME",
            description: "The name of your App Store Connect team if you're in multiple teams",
            optional: true,
            code_gen_sensitive: true,
            default_value: CredentialsManager::AppfileConfig.try_fetch_value(:itc_team_name),
            default_value_dynamic: true,
            verify_block: proc do |value|
              ENV["FASTLANE_ITC_TEAM_NAME"] = value.to_s
            end
          )
        ]
      end

      def self.return_value
        "The version string for specified combination of parameters"
      end

      def self.authors
        ["Igor Sova"]
      end

      def self.is_supported?(platform)
        [:ios, :mac].include?(platform)
      end
    end
  end
end
