const {
  checkForUncommittedChanges,
  checkForSigningKey,
  checkExistingPatches,
  tagLastDeployment,
  uploadSourceMap,
  exit,
  deploy,
  bundle,
} = require('./tasks')
const { info } = require('./utils')

async function codepush(config) {
  const { codepushVersion, codeBundleId, app, platform, baseline, bundleJson } = config
  info(`Running codepush with params:\n${JSON.stringify(config, null, 2)}`)
  checkForUncommittedChanges()
  checkForSigningKey(process.env.PWD)
  checkExistingPatches(config)
  const { bundlePath, sourcemap, outputDir } = await bundle({
    bundlerConfig: config,
    app: app,
    base: baseline,
    bundleJson: {
      codeBundleId,
      codepushVersion,
      ...bundleJson
    },
  })
  await deploy(config, outputDir)
  uploadSourceMap({
    bundlePath,
    sourceMapPath: sourcemap,
    apiKey: config.bugsnagApiKey,
    platform: platform,
    codeBundleId,
  })
  tagLastDeployment(config)
  exit()
}

module.exports = {
  codepush
}
