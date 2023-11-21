PLIST_PATHS = [
    "ios/swc/Info.plist",
    "ios/Widget\ Extension/Info.plist",
    "ios/intents-extension/Info.plist",
    "ios/notification-service-extension/Info.plist",
    "ios/watch-extension/Info.plist",
    "ios/watch-intents/Info.plist",
    "ios/watch/Info.plist",
]
IOS_VERSION_KEY = "CFBundleShortVersionString"
BUILD_GRADLE_PATH = "android/app/build.gradle"
REPO = "sweatco/sweatcoin-mobile"
PROJECT_KEY = "LOG"
ISSUE_TYPE = "Release"
VERSION_PATTERN = "MAJOR.SECURITY.HOTFIX"
VERSION_REGEX = /^\d+\.\d+.\d+$/
TRANSLATIONS_PATH: ["./translations/**", "./ios/swc/Resources/**", "./android/app/src/main/res/**"]
