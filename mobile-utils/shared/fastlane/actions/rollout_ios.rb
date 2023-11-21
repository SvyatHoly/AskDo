module Fastlane
  module Actions
    class RolloutIosAction < Action
      def self.run(params)
        require 'spaceship'

        if (api_token = Spaceship::ConnectAPI::Token.from(filepath: params[:api_key_path]))
          UI.message("Creating authorization token for App Store Connect API")
          Spaceship::ConnectAPI.token = api_token
        elsif
          UI.message("Can not create token for App Store Connect API")
        end

        app = Spaceship::ConnectAPI::App.find(params[:app_bundle_id])

        if (pending_release_version = app.get_pending_release_app_store_version)
          version = pending_release_version.version_string
          build_number = pending_release_version.get_build.version

          UI.message("Found pending release version #{version} (#{build_number}). Releasing...")

          pending_release_version.create_app_store_version_release_request

          return { version: version, build_number: build_number }
        elsif
          UI.message("No pending release version")
        end 
      end

      #####################################################
      # @!group Documentation
      #####################################################

      def self.description
        "Release reviewed build"
      end

      def self.available_options
        [
          FastlaneCore::ConfigItem.new(
            key: :api_key_path,
            env_name: "ASC_API_KEY_PATH", # The name of the environment variable
            description: "ASC API key path", # a short description of this parameter
            optional: false
          ),
          FastlaneCore::ConfigItem.new(
            key: :app_bundle_id,
            env_name: "APP_BUNDLE_ID", # The name of the environment variable
            description: "Apple app bundle id", # a short description of this parameter
            optional: false
          )
        ]
      end

      def self.return_value
        "A hash containing version and build_number if exist"
      end

      def self.is_supported?(platform)
        platform == :ios
      end
    end
  end
end
