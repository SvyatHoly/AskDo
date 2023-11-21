import { execSync } from 'child_process'
import * as fs from 'fs'

import type { Task } from './types'
import { CI } from './utils'

const ONE_MEGABYTE_IN_BYTES = 1_000_000
export const ONE_KILOBYTE_IN_BYTES = 1_000
const BUNDLE_NAME = 'index.android.bundle'

const bundleSize = (path: string): number => fs.statSync(`${path}/${BUNDLE_NAME}`).size
const zip = (path: string) => {
  execCommand(`zip -r ${path}.zip ${path}`)

  return fs.statSync(`${path}.zip`)
}
const execCommand = (command: string, silently: boolean = false): string => {
  return execSync(silently ? `${command} >/dev/null 2>/dev/null` : command).toString().trim()
}
const isFileModified = (fileName: string): boolean => {
  try {
    return (
      execCommand(
        `git diff --name-only $(git merge-base $(git rev-parse origin/main) $(git rev-parse HEAD)) | grep '${fileName}$'`
      ) === fileName
    )
  } catch (error) {
    return false
  }
}

function doInMain<R>(command: () => R): () => R {
  return () => {
    execCommand('git fetch --quiet origin main;')
    const currentCommitHash = execCommand('git rev-parse HEAD')
    const isPackageJsonModified = isFileModified('package.json')
    // switch to the commit before current branch was created
    const hash = execCommand('git merge-base origin/main HEAD')
    execCommand(`git checkout ${hash}`)
    let result: R

    if (isPackageJsonModified) {
      // if package.json was changed we need to reinstall node_modules to assemble the main branch properly
      // but we also want to restore node_modules for current branch latter
      // so we make backup here and hide it inside new node_modules folder because of "Duplicated files or mocks. Please check the console for more info" bug
      CI.log("package.json was modified so it's needed to reinstall node_modules")
      fs.renameSync('node_modules', 'node_modules_backup')
      execCommand('yarn install --frozen-lockfile', true)
      fs.renameSync('node_modules_backup', 'node_modules/node_modules_backup')
      result = command()
      // restore node_modules and checkout to current commit because it may be needed to some code after (for example dangerjs)
      fs.renameSync('node_modules/node_modules_backup', 'node_modules_backup')
      fs.rmSync('node_modules', { recursive: true })
      fs.renameSync('node_modules_backup', 'node_modules')
    } else {
      result = command()
    }

    execCommand(`git checkout ${currentCommitHash}`)

    return result
  }
}

const calculateMainBundleSize = (entryFile: string) =>
  doInMain(() => {
    const output = 'check_bundle_size'

    if (fs.existsSync(output)) {
      fs.rmSync(output, { recursive: true })
    }

    execBundle(entryFile, output)

    return {
      main: bundleSize(output),
      archived: zip(output).size,
    }
  })()

interface PrintReportConfig {
  current: number
  main: number
  archivedCurrent: number
  archivedMain: number
  threshold: number
  markdown: (message: string) => void
  warn: (message: string) => void
}

const percentageDiff = (current: number, main: number): number => {
  const abs = current - main
  const avg = (main + current) / 2
  const diff = (abs / avg) * 100
  return diff
}

const signed = (number: number): string => {
  const sign = number ? (number > 0 ? '+' : '-') : ''
  return `${sign}${Math.abs(number).toFixed(2)}%`
}

const withEmoji = (diff: number, threshold: number, diffAsString: string) => {
  const caution = (text: string) => `${text} &#x1F6A8;` // `${text} 🚨`
  const excellent = (text: string) => `${text} &#x1F44D;` // `${text} 👍`

  return diff > threshold ? caution(diffAsString) : diff < 0 ? excellent(diffAsString) : diffAsString
}

const printReport = ({
  current,
  main,
  archivedCurrent,
  archivedMain,
  threshold,
  markdown,
  warn,
}: PrintReportConfig) => {
  const diff = current - main
  const archivedFiff = archivedCurrent - archivedMain
  const diffAsString = signed(percentageDiff(current, main))
  const archivedDiffAsString = signed(percentageDiff(archivedCurrent, archivedMain))
  const bytesToMegabytes = (byte: number) => (byte / ONE_MEGABYTE_IN_BYTES).toFixed(2)

  const errorMessage =
    diff > threshold || archivedFiff > threshold
      ? `Bundle has increased in size by ${diffAsString} (archived with assets ${archivedDiffAsString})`
      : ''

  const details = `
  ### Difference between bundle from the main branch and bundle from current branch. (It also can show how many megabytes will be downloaded via codepush)
  
  | Name    | Size (Mb) |
  | ------- | --------- |
  | Main (before current branch was branched)  | ${bytesToMegabytes(main)} |
  |  Current branch  | ${bytesToMegabytes(current)} |
  |  Archived main (with assets)  | ${bytesToMegabytes(archivedMain)} |
  |  Archived current (with assets) | ${bytesToMegabytes(archivedCurrent)} |
  |  Diff   |  ${withEmoji(diff, threshold, diffAsString)}  |
  |  Arhcived diff (with assets)   |  ${withEmoji(archivedFiff, threshold, archivedDiffAsString)}  |
  `
  markdown(details)
  errorMessage && warn(errorMessage)
}

interface CheckBundleSizeConfig {
  /**
   * path to react-native bundle
   */
  bundleOutput: string
  /**
   * size of difference as bytes
   */
  threshold: number
  /**
   * entry file name
   */
  entryFile: string
}

export const checkBundleSize = (config: CheckBundleSizeConfig): Task => (danger) => {
  CI.log('Check bundle file size diff output...')
  try {
    const { bundleOutput, threshold, entryFile } = config
    const currentBundleSize = bundleSize(bundleOutput)
    const currentArchivedBundleSize = zip(bundleOutput).size
    const { main, archived: archivedMain } = calculateMainBundleSize(entryFile)

    CI.log(
      `currentBundleSize = ${currentBundleSize}; currentArchivedBundleSize = ${currentArchivedBundleSize} mainSize = ${main}; archivedMainSize = ${archivedMain}`
    )

    if (Math.abs(currentArchivedBundleSize - archivedMain) > threshold) {
      CI.log('Print bundle size diff report')
      printReport({
        ...config,
        warn: danger.warn,
        markdown: danger.markdown,
        archivedMain,
        main,
        current: currentBundleSize,
        archivedCurrent: currentArchivedBundleSize,
      })
    }
  } catch (error) {
    CI.error(error)
  }
}

const execBundle = (entryFile: string, bundleOutput: string) => {
  const bundlePath = `${bundleOutput}/${BUNDLE_NAME}`
  execCommand(
    `mkdir ${bundleOutput} && yarn react-native bundle --platform android --dev false --entry-file ${entryFile} --bundle-output ${bundlePath} --assets-dest ${bundleOutput} --reset-cache`
  )
}
