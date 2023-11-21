const { getCodeBundleId, getNextCodepushVersion } = require('./utils')

const android = {
  platform: 'android',
  bundleName: 'index.android.bundle',
}

const ios = {
  platform: 'ios',
  bundleName: 'main.jsbundle',
}

const getConfig = (partialConfig) => {
  const config = {
    ...partialConfig,
    ...(partialConfig?.platform === 'ios' ? ios : android),
  }
  const codepushVersion = getNextCodepushVersion(config)
  const codeBundleId = getCodeBundleId(config)

  return {
    ...config,
    codepushVersion,
    codeBundleId,
  }
}

module.exports = {
  getConfig,
}
