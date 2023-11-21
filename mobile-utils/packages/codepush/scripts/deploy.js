const { execCommand, getAppVersion, info } = require('./utils')

function release(content, app, version = '') {
  execCommand(
    `yarn appcenter codepush release -a ${app} -c ${content} -t ${version} -d Staging -k codepush-private.pem`
  )
}

async function deploy({ platform, app, codepushVersion, ...rest }, output) {
  const version = await getAppVersion({ os: platform, ...rest })
  info(`Deploying for ${app}:${version} the bundle with version ${codepushVersion}...`)
  release(output, app, version)
  console.info('[CodePush] Deployment: ✔')
}

module.exports = {
  deploy,
}
