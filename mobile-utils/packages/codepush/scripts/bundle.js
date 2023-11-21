const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const childProcess = require('child_process')
const { getAppVersion, execCommand, execCommandSilently, info } = require('./utils')
const { runHermesEmitBinaryCommand } = require('appcenter-cli/dist/commands/codepush/lib/react-native-utils')
const { assetExts } = require('./assetExts')

const HASH_ALGORITHM = 'sha256'
const FILE_TYPES = new Set(assetExts)

const ext = (filePath) => {
  const extname = path.extname(filePath)
  if (extname.startsWith('.')) {
    return extname.substr(1)
  }
  return extname
}

const rmRf = (pathToRemove) => fs.rmSync(pathToRemove, { recursive: true, force: true })

const getCliPath = () => path.join('node_modules', '.bin', 'react-native')
// Original - https://github.com/microsoft/appcenter-cli/blob/7b637743eec2fd4e960823bfa76fe568c4f5e4ff/src/commands/codepush/lib/react-native-utils.ts#L282
function runReactNativeBundleCommand(
  bundleName,
  development,
  entryFile,
  outputFolder,
  platform,
  sourcemapOutput,
  extraBundlerOptions
) {
  const reactNativeBundleArgs = [
    getCliPath(),
    'bundle',
    '--assets-dest',
    outputFolder,
    '--bundle-output',
    path.join(outputFolder, bundleName),
    '--dev',
    development,
    '--entry-file',
    entryFile,
    '--platform',
    platform,
    ...extraBundlerOptions,
  ]
  if (sourcemapOutput) {
    reactNativeBundleArgs.push('--sourcemap-output', sourcemapOutput)
  }
  const reactNativeBundleProcess = childProcess.spawn('node', reactNativeBundleArgs)

  return new Promise((resolve, reject) => {
    reactNativeBundleProcess.on('close', (exitCode, signal) => {
      if (exitCode !== 0) {
        reject(new Error(`"react-native bundle" command failed (exitCode=${exitCode}, signal=${signal}).`))
      }
      resolve(null)
    })
  })
}

const bundleReactNative = async (outputPath, config, shouldBuildSourceMaps) => {
  const outputDir = path.join(outputPath, 'output')
  fs.mkdirSync(outputDir)
  const sourcemapOutputDir = path.join(outputPath, 'sourcemap')
  fs.mkdirSync(sourcemapOutputDir)
  const { bundleName, entryFile, platform } = config
  const sourcemapOutput = path.join(sourcemapOutputDir, bundleName + '.map')
  await runReactNativeBundleCommand(
    bundleName,
    false, // development
    entryFile, // entryFile
    outputDir, // outputFolder
    platform, // platform
    sourcemapOutput, // sourcemapOutput
    ['--reset-cache'] // extraBundlerOptions
  )
  if (shouldBuildSourceMaps) {
    await runHermesEmitBinaryCommand(
      bundleName,
      outputDir,
      sourcemapOutput,
      [] // extraHermesFlags
    )
  }

  return {
    outputDir,
    bundlePath: path.join(outputDir, bundleName),
    sourcemap: sourcemapOutput,
  }
}

const checkout = (commit) => {
  info(`Switch to ${commit}`)
  execCommandSilently(`git checkout ${commit}`)
}

const build = async (bundlerConfig, commit, prefix, shouldBuildSourceMaps = false) => {
  const tmpPath = path.join(prefix, commit.replaceAll(/\.|\//g, '_'))
  rmRf(tmpPath)
  fs.mkdirSync(tmpPath)
  info(`Bundling for ${commit}`)
  execCommandSilently('yarn install --force')
  const output = await bundleReactNative(tmpPath, bundlerConfig, shouldBuildSourceMaps)
  execCommandSilently('git restore .')

  return output
}

const checkoutAndBuild = async (bundlerConfig, commit, prefix) => {
  checkout(commit)
  const output = await build(bundlerConfig, commit, prefix)

  return output
}

function getAllFiles(folderName, result = [], prefix = '') {
  const folderFiles = fs.readdirSync(folderName)

  for (const file of folderFiles) {
    const fullPath = path.join(folderName, file)
    const stat = fs.statSync(fullPath)
    const relativePath = path.join(prefix, file)
    if (stat.isDirectory()) {
      getAllFiles(fullPath, result, relativePath)
    } else {
      result.push(relativePath)
    }
  }

  return result
}

function fileExists(file) {
  try {
    return fs.statSync(file).isFile()
  } catch (e) {
    return false
  }
}

async function fileHash(filePath) {
  const readStream = fs.createReadStream(filePath)
  const hashStream = crypto.createHash(HASH_ALGORITHM)

  return new Promise((resolve, reject) => {
    readStream
      .pipe(hashStream)
      .on('error', reject)
      .on('finish', function () {
        hashStream.end()
        const buffer = hashStream.read()
        const hash = buffer.toString('hex')
        resolve(hash)
      })
  })
}

async function diffAssets(currentOutput, baseOutput) {
  const changed = []
  for (const filePath of getAllFiles(currentOutput)) {
    if (!fileExists(path.join(baseOutput, filePath))) {
      changed.push(filePath)
      continue
    }
    if (!FILE_TYPES.has(ext(filePath))) {
      continue
    }
    const [currentHash, baseHash] = await Promise.all([
      fileHash(path.join(currentOutput, filePath)),
      fileHash(path.join(baseOutput, filePath)),
    ])
    if (currentHash !== baseHash) {
      changed.push(filePath)
    }
  }

  return changed
}

async function removeUnchangedAssets(currentOutput, baseOutput) {
  for (const filePath of getAllFiles(currentOutput)) {
    if (!FILE_TYPES.has(ext(filePath))) {
      continue
    }
    if (!fileExists(path.join(baseOutput, filePath))) {
      continue
    }
    const [currentHash, baseHash] = await Promise.all([
      fileHash(path.join(currentOutput, filePath)),
      fileHash(path.join(baseOutput, filePath)),
    ])
    if (currentHash === baseHash) {
      fs.rmSync(path.join(currentOutput, filePath))
    }
  }
}

function writeBundleJson(bundleJsPath, json) {
  const bundleJsFullPath = path.join(process.env.PWD, bundleJsPath)
  if (!fs.existsSync(bundleJsFullPath)) {
    throw new Error(
      `There is no bundle config file. It seems that you forgot to add json to the ${bundleJsPath} or the config was moved accidentally.`
    )
  }
  const content = JSON.parse(fs.readFileSync(bundleJsFullPath, 'utf-8'))
  const stringifedContent = JSON.stringify({ ...content, ...json }, null, 2)
  info(`Writting bundle json with content\n${stringifedContent}\nto ${bundleJsFullPath}`)
  fs.writeFileSync(bundleJsFullPath, JSON.stringify({ ...content, ...json }, null, 2))
}

async function bundle({ bundlerConfig, base, bundleJson }) {
  const { platform } = bundlerConfig
  info(`Checking version for ${platform}...`)
  const version = await getAppVersion({ os: platform, ...bundlerConfig })
  info(`Version for ${platform} is ${version}`)
  execCommandSilently('git fetch origin')
  const current = execCommand('git rev-parse HEAD')
  const outputPath = '.codepush'
  rmRf(outputPath)
  fs.mkdirSync(outputPath)
  const baseOutput = await checkoutAndBuild(bundlerConfig, base, outputPath)
  const currentOutput = await checkoutAndBuild(bundlerConfig, current, outputPath)

  info('Diffing...')
  const changedAssets = await diffAssets(currentOutput.outputDir, baseOutput.outputDir)
  info('Diffing: ✔')

  info('Bundling...')
  writeBundleJson(bundlerConfig.bundleJsPath, { changedAssets, ...bundleJson })
  const output = await build(bundlerConfig, current, outputPath, true)
  info('Removing unchanged assets...')
  await removeUnchangedAssets(output.outputDir, baseOutput.outputDir)
  execCommandSilently('git restore .')
  info('Bundling: ✔')

  return output
}

module.exports = {
  bundle,
}
