const { execSync } = require('child_process')
const { getReactNativeProjectAppVersion } = require('appcenter-cli/dist/commands/codepush/lib/react-native-utils')

const getAppVersion = getReactNativeProjectAppVersion

const getHistory = (app, deployment = 'Staging') => {
  try {
    return execSync(`yarn --silent appcenter codepush deployment history ${deployment} --app ${app} --output json`)
  } catch (err) {
    console.error(err.stdout.toString())
    process.exit(2)
  }
}

const getLastDeployment = (app, deployment) => {
  try {
    const history = JSON.parse(getHistory(app, deployment))
    const lastEntry = history.splice(-1)[0]

    if (lastEntry) {
      return { label: lastEntry[0], version: lastEntry[2] }
    }
    return { label: 'v0', version: '1.0' }
  } catch (err) {
    console.error(err)
    process.exit(3)
  }
}

const args = process.argv.slice(2)
const extractArg = (index, message) => {
  const value = args[index]
  if (value == null && message) {
    console.error(message)
    process.exit(8)
  }
  return value
}

const execCommand = (command) => execSync(command).toString().trim()
const execCommandSilently = (command) => execCommand(`${command} >/dev/null 2>/dev/null`)

const info = (message) => console.info(`[CodePush] ${message}`)

const getNextCodepushVersion = (config) => {
  const deployment = getLastDeployment(config.app)
  return parseInt(deployment.label.substring(1)) + 1
}

const getCodeBundleId = (config) => `${config.platform}-v${getNextCodepushVersion(config)}`

module.exports = {
  getAppVersion,
  getHistory,
  getLastDeployment,
  extractArg,
  execCommand,
  execCommandSilently,
  info,
  getCodeBundleId,
  getNextCodepushVersion,
}
