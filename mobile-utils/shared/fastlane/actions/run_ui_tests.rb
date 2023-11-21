module Fastlane
    module Actions
        class RunUiTestsAction < Action
            def self.run(options)
                # Ensure all required environment variables are set
                required_env_vars = ['BUILD_TRIGGERED_BY', 'BUILD_URL', 'BRANCH', 'BUILD_NUMBER']
                missing_env_vars = required_env_vars - ENV.keys
                unless missing_env_vars.empty?
                    raise "Missing environment variables: #{missing_env_vars.join(', ')}"
                end

                platform = lane_context[:PLATFORM_NAME]
                artifacts_dir = options[:artifacts_dir]
                app_name = options[:app_name] || ""

                if platform == :ios
                    run_detox = "detox test #{options[:test_suite]} -c ios.sim.debug --artifacts-location '#{artifacts_dir}' --record-videos failing --record-logs failing"
                elsif platform == :android
                    avd_gpu = other_action.is_ci ? "swiftshader_indirect" : "host"
                    puts "android emulator -gpu value will be #{avd_gpu}"
                    run_detox = "detox test #{options[:test_suite]} -c android.emu.debug --record-videos failing --record-logs failing --artifacts-location '#{artifacts_dir}' --headless --gpu #{avd_gpu}"
                else
                    puts "Unsupported platform: #{platform}"
                    exit 1
                end

                qase_params = "QASE_REPORT=1 QASE_RUN_NAME='[Autotests] #{platform} RC #{ENV['BUNDLE_VERSION_STRING']} #{ENV['BUILD_NUMBER']}'"
                tests_results = "#{artifacts_dir}/test-results.json"

                is_rc = ENV['BRANCH'].include?("release")

                run_cmd = "#{run_detox} --outputFile '#{tests_results}' --json || true"
                run_cmd = "#{qase_params} #{run_cmd}" if is_rc || ENV['REPORT_TO_QASE'] == '1'
                sh(run_cmd)

                failed_tests = JSON.parse(File.read("#{tests_results}"))['numFailedTests']

                if is_rc 
                    qa_team_to_mention = options[:qa_team_to_mention] || "@qa-product"
                    report_rc(platform, failed_tests, options[:qase_link], qa_team_to_mention)
                else 
                    report_internal(app_name, platform, failed_tests)
                end
            end

            def self.report_rc(platform, failed_tests, qase_link, qa_team_to_mention)
                if failed_tests == 0
                    puts "All tests passed!"
                    slack_message = ":white_check_mark: #{qa_team_to_mention} [Autotests] #{platform} RC #{ENV['BUNDLE_VERSION_STRING']} #{ENV['BUILD_NUMBER']} passed successfully!\n<#{ENV['BUILD_URL']}|Teamcity>\n<#{qase_link}|QASE>"
                else 
                    puts "Error: #{failed_tests} tests failed"
                    slack_message = ":x: #{qa_team_to_mention} @aqa [Autotests] #{platform} RC #{ENV['BUNDLE_VERSION_STRING']} #{ENV['BUILD_NUMBER']} failed with #{failed_tests} test(s). \n<#{ENV['BUILD_URL']}|Teamcity>\n<#{qase_link}|QASE>"
                end

                # Report results to Slack
                other_action.slack(
                    message: slack_message,
                    slack_url: ENV['RC_SLACK_URL'],
                    default_payloads: [],
                    link_names: true,
                    attachment_properties: { color: "#000000" }
                )
            end

            def self.report_internal(app_name, platform, failed_tests)
                if failed_tests == 0
                    puts "All tests passed!"
                    slack_message = "#{app_name} #{platform} E2E tests by #{slack_name} within #{ENV['BRANCH']}. Link to CI: #{ENV['BUILD_URL']}"
                    attachment_properties = {}
                else 
                    puts "Error: #{failed_tests} tests failed"
                    slack_message = "Failed #{failed_tests}: #{app_name} #{platform} E2E tests by #{slack_name} within #{ENV['BRANCH']}. Link to CI: #{ENV['BUILD_URL']}"
                    attachment_properties = { color: "#FF0000" }
                end

                # Report results to Slack
                other_action.slack(
                    message: slack_message,
                    slack_url: ENV['QASE_REPORTS_SLACK_URL'],
                    default_payloads: [],
                    link_names: true,
                    attachment_properties: attachment_properties
                )
            end

            require_relative 'constants/usernames'

            def self.slack_name
                teamcity_username = ENV['BUILD_TRIGGERED_BY']
                slack_username = USERNAMES[teamcity_username.to_sym]
                slack_username || teamcity_username
            end

            #####################################################
            # @!group Documentation
            #####################################################

            def self.description
                "Runs UI tests per platform and report the results to Qase (for RC) or to Slack (for internal)"
            end

            def self.available_options
                [
                  FastlaneCore::ConfigItem.new(
                    key: :artifacts_dir,
                    env_name: "ARTIFACTS_DIR",
                    description: "The directory where artifacts are stored",
                    optional: true,
                    default_value: "artifacts"
                  ),
                  FastlaneCore::ConfigItem.new(
                    key: :bundle_version_string,
                    env_name: "BUNDLE_VERSION_STRING",
                    description: "The bundle version string",
                    optional: true
                  ),
                  FastlaneCore::ConfigItem.new(
                    key: :build_triggered_by,
                    env_name: "BUILD_TRIGGERED_BY",
                    description: "The entity that triggered the build",
                    optional: true
                  ),
                  FastlaneCore::ConfigItem.new(
                    key: :build_url,
                    env_name: "BUILD_URL",
                    description: "The URL of the build",
                    optional: true
                  ),
                  FastlaneCore::ConfigItem.new(
                    key: :branch,
                    env_name: "BRANCH",
                    description: "The branch name",
                    optional: true
                  ),
                  FastlaneCore::ConfigItem.new(
                    key: :build_number,
                    env_name: "BUILD_NUMBER",
                    description: "The build number",
                    optional: true
                  ),
                  FastlaneCore::ConfigItem.new(
                    key: :test_suite,
                    env_name: "TEST_SUITE_NAME",
                    description: "Test suite to run",
                    optional: false
                  ),
                  FastlaneCore::ConfigItem.new(
                    key: :qase_link,
                    env_name: "QASE_LINK",
                    description: "Link to the Qase project",
                    optional: false
                  ),
                  FastlaneCore::ConfigItem.new(
                    key: :qa_team_to_mention,
                    env_name: "QA_TEAM_TO_MENTION",
                    description: "QA team to mention in slack reporting",
                    optional: true
                  ),
                  FastlaneCore::ConfigItem.new(
                    key: :app_name,
                    env_name: "APP_NAME",
                    description: "App name to be reported",
                    optional: true
                  ),
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
