import { execSync } from 'child_process'

import { DangerJs } from './types'
import { CI } from './utils'

export const enLocaleStateCheck = ({ fail }: DangerJs) => {
  // Exec transalte to regenerate en.json
  // Script can throw in case if we have duplicates in the keys
  try {
    execSync('yarn translate')
  } catch (e) {
    fail(`:exclamation: yarn translate throws an error: ${e as string}`)
  }

  try {
    const diff = execSync("git diff -U0 translations/locales/en.json | tail -n +5 | grep -e '^[+-]'").toString()
    if (diff.length > 0) {
      fail(':exclamation: EN locale is out of date:\n```\n' + diff + '```')
    }
  } catch (exception) {
    CI.error(`Failed to get EN locale diff: ${exception as string}`)
  }
}
