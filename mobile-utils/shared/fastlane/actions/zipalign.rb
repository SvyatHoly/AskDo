module Fastlane
  module Actions
    module SharedValues
      ZIPALIGN_CUSTOM_VALUE = :ZIPALIGN_CUSTOM_VALUE
    end

    class ZipalignAction < Action
      def self.run(params)

       UI.user_error!("Couldn't find '*release.apk' file at path 'android/app/build/outputs/apk/'") unless params[:apk_path]

       new_name = params[:apk_path].gsub('.apk', '-unaligned.apk')
       rename_command = ["mv", params[:apk_path], new_name]
       Fastlane::Actions.sh(rename_command, log: params[:log])

       aligncmd = ["zipalign -p -v -f 4", new_name, " ", params[:apk_path]]
       Fastlane::Actions.sh(aligncmd, log: params[:log])

       UI.message('Input apk is aligned')
     end 
      #####################################################
      # @!group Documentation
      #####################################################

      def self.description
        "Zipalign an apk. Input apk is renamed '*-unaligned.apk'"
      end

      def self.available_options

        apk_path_default = Dir["*.apk"].last || Dir[File.join("app", "build", "outputs", "apk", "*release.apk")].last

        [
          FastlaneCore::ConfigItem.new(key: :apk_path,
                                       env_name: "INPUT_APK_PATH",
                                       description: "Path to your APK file that you want to align",
                                       default_value: Actions.lane_context[SharedValues::GRADLE_APK_OUTPUT_PATH] || apk_path_default,
                                       optional: true),
          FastlaneCore::ConfigItem.new(key: :log,
                                      env_name: "ZIPALIGN_LOG",
                                      description: "Log zipalign output",
                                      default_value: false,
                                      optional: true,
                                      is_string: false)
        ]
      end

      def self.authors
        ["nomisRev"]
      end

      def self.is_supported?(platform)
        platform == :android
      end
    end
  end
end
