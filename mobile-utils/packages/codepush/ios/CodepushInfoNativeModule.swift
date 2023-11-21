import React

@objc(CodepushInfoNativeModule)
class CodepushInfoNativeModule: NSObject {
    @objc var bundleManager: RCTBundleManager!

    @objc
    static func requiresMainQueueSetup() -> Bool {
      return true
    }

    @objc
    func constantsToExport() -> [String: Any]! {
      let bundlePath = Bundle.main.bundlePath

      return [
        "mainBundlePath": bundlePath,
      ]
    }
}

