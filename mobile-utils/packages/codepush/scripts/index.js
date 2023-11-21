const { getConfig } = require('./config')
const { extractArg, getAppVersion } = require('./utils')
const { codepush } = require('./codepush')

module.exports = {
  getAppVersion,
  getConfig,
  extractArg,
  codepush,
}
