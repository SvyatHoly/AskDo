const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const { getLastDeployment, info, getAppVersion } = require('./utils')

const checkForUncommittedChanges = () => {
  const staged = execSync('git diff --name-only --staged').toString()
  const unstaged = execSync('git diff --name-only').toString()
  if (staged || unstaged) {
    console.error('\n❌ Uncommitted changes detected. Commit or stash them and try again')
    console.error('Aborting...')
    process.exit(6)
  }
}

const checkForSigningKey = (root) => {
  const exists = fs.existsSync(path.join(root, 'codepush-private.pem'))

  if (!exists) {
    console.error(
      '\n❌ Private signing certificate could not be found. Grab one from the 1password (search for `codepush`)\n'
    )
    process.exit(7)
  }
}

const checkExistingPatches = ({ platform, ...rest }) => {
  info('Checking for existing patches...')
  const currentTagPrefix = `codepush-${platform}-${getAppVersion({ os: platform, ...rest })}`

  const sutableTags = execSync('git ls-remote --tags origin')
    .toString()
    .split('\n')
    .filter((t) => t.includes(currentTagPrefix))

  if (sutableTags) {
    const tags = sutableTags.map((t) => {
      const [sha, , , name] = t.replace('\t', '/').split('/')
      return { sha, name }
    })

    tags.forEach(({ sha, name }) => {
      const exists = execSync(`git branch $(git symbolic-ref --short HEAD) --contains ${sha}`).toString().length > 0

      if (!exists) {
        console.error(`\n❌ Failed to locate the tag "${name}" in the current branch.\n`)
        process.exit(5)
      }
    })
  }
  info('Checking for existing patches: ✔')
}

const tagLastDeployment = ({ app, platform }) => {
  info('[CodePush] Tagging...')
  try {
    const deployment = getLastDeployment(app)
    const tag = `codepush-${platform}-${deployment.version}-${deployment.label}`

    execSync(`git tag ${tag} --force`)

    info(`Pushing tag ${tag}...`)
    execSync(`git push origin ${tag}`)
    info('Tagging: ✔')
  } catch (err) {
    console.error(err.stdout.toString())
    process.exit(4)
  }
}

const uploadSourceMap = ({ bundlePath, sourceMapPath, apiKey, platform, codeBundleId }) => {
  if (!apiKey) {
    info('The Bugsnag API key is empty, so the uploadSourceMap step is skipped!')
    return
  }
  info('Uploading source map...')
  try {
    execSync(
      `bugsnag-source-maps upload-react-native --api-key ${apiKey} --platform ${platform} --source-map ${sourceMapPath} --bundle ${bundlePath} --code-bundle-id ${codeBundleId}`
    )
    info('Uploading source map: ✔')
  } catch (err) {
    console.error(err.stdout.toString())
    process.exit(1)
  }
}

function exit() {
  info('[CodePush] Exiting...')
  process.exit(0)
}

const { bundle } = require('./bundle')
const { deploy } = require('./deploy')

module.exports = {
  checkForUncommittedChanges,
  checkForSigningKey,
  checkExistingPatches,
  tagLastDeployment,
  uploadSourceMap,
  exit,
  bundle,
  deploy,
}
