const path = require('path')
const metroConfig = require(path.join(process.env.PWD, 'metro.config.js'))

const { assetExts } = metroConfig.resolver

if (!assetExts) {
  throw new Error('There is no assetExts metro.config.js')
}

module.exports = {
  assetExts,
}
