module Fastlane
  module Actions
    module SharedValues
      SIGNED_APK_PATH = :SIGNED_APK_PATH
    end

    class SignApkAction < Action
      def self.run(params)
      
      UI.user_error!("Couldn't find '*release-unsigned.apk' file at path 'app/build/outputs/apk/'") unless params[:apk_path]

      UI.user_error("Need keystore in order to sign apk") unless params[:keystore_path]

      sign_cmd = ["apksigner sign --v2-signing-enabled --verbose"]
      sign_cmd << ["--in #{params[:apk_path].shellescape}"] if params[:apk_path]
      sign_cmd << ["--ks #{params[:keystore_path].shellescape}" ] if params[:keystore_path]
      sign_cmd << ["--ks-key-alias '#{params[:alias]}'"] if params[:alias]
      sign_cmd << ["--key-pass pass:#{params[:keypass] ? params[:keypass] : params[:storepass]}"] if params[:keypass] || params[:storepass]
      sign_cmd << ["--ks-pass pass:#{params[:storepass]}"] if params[:storepass]

      if params[:signed_apk_path]
        sign_cmd << ["--out #{params[:signed_apk_path]}" ]
        Actions.lane_context[SharedValues::SIGNED_APK_PATH] = "#{params[:signed_apk_path]}"
      elsif params[:apk_path].include?("unsigned")
        sign_cmd << ["--out #{params[:apk_path].gsub('-unsigned', '')}"]
        Actions.lane_context[SharedValues::SIGNED_APK_PATH] = "#{params[:apk_path].gsub('-unsigned', '')}"
      end

      Fastlane::Actions.sh(sign_cmd, log: params[:log])
    end

      #####################################################
      # @!group Documentation
      #####################################################

      def self.description
        "Sign a Android apk with a java keystore"
      end

      def self.available_options 

        apk_path_default = Dir["*.apk"].last || Dir[File.join("app", "build", "outputs", "apk", "*release-unsigned.apk")].last

        [
          FastlaneCore::ConfigItem.new(key: :apk_path,
                                       env_name: "apk_path",
                                       description: "Path to your APK file that you want to sign",
                                       default_value: Actions.lane_context[SharedValues::GRADLE_APK_OUTPUT_PATH] || apk_path_default,
                                       optional: true),
          FastlaneCore::ConfigItem.new(key: :signed_apk_path,
                                       env_name: "SIGNED_APK_PATH",
                                       description: "Path to the signed APK file",
                                       optional: true,
                                       is_string: true),
          FastlaneCore::ConfigItem.new(key: :keystore_path,
                                       env_name: "KEYSTORE_PATH",
                                       description: "Path to java keystore",
                                       optional: true),
          FastlaneCore::ConfigItem.new(key: :alias,
                                       env_name: "ALIAS",
                                       description: "The alias of the certificate in the keystore to use to sign the apk",
                                       is_string: true),
          FastlaneCore::ConfigItem.new(key: :keypass,
                                       env_name: "KEY_PASS",
                                       description: "The password used to protect the private key of the keystore entry addressed by the alias specified. If not specified storepass will be used",
                                       optional:true,
                                       is_string: true),
          FastlaneCore::ConfigItem.new(key: :storepass,
                                       env_name: "STORE_PASS",
                                       description: "The password which is required to  access  the keystore",
                                       is_string: true),
          FastlaneCore::ConfigItem.new(key: :log,
                                       env_name: "SIGN_APK_LOG",
                                       description: "Log jarsigner output",
                                       default_value: false,
                                       optional: true,
                                       is_string: false)
        ]
      end

      def self.output
          ['SIGN_APK_PATH', 'Path to your APK file']
      end

      def self.authors
        "nomisRev"
      end

      def self.is_supported?(platform)
        platform == :android
      end
    end
  end
end
