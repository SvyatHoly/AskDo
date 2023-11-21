import { execSync } from 'child_process'

import { printTSReport } from './printTSReport'
import { Task } from './types'
import { CI } from './utils'

interface ExecSyncError {
  stdout: string | Buffer
}

const isExecSyncError = (error: unknown): error is ExecSyncError => (error as ExecSyncError)?.stdout != null

export const checkTypeScript = (project: string): Task => ({ danger, message, fail }) => {
  const headSha = danger.github.pr.head.sha
  try {
    CI.log('checking typescript...')
    execSync('yarn tsc')
    message(':white_check_mark: No TypeScript errors, good job!')
    CI.log('typescript passed!')
  } catch (error) {
    if (isExecSyncError(error)) {
      const stdout = error.stdout.toString()
      printTSReport({ project, output: stdout, headSha, fail })
      CI.log(stdout)
    }
    CI.error(String(error))
  }
}
