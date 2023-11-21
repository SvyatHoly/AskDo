import { execSync } from 'child_process'
import { Task } from './types'
import { CI } from './utils'

const ERRORS_LIMIT = 100

const parse = (line: string) => /^(.*):(.*) - (.*)/.exec(line)

export const findDeadCode = (project: string): Task => async ({ message, fail, danger }) => {
  CI.log('[ts-prune]: finding deadcode...')
  try {
    const logs = execSync('yarn find-deadcode').toString().split('\n')
    const headSha = danger.github.pr.head.sha
    const messages: string[] = []

    for (const line of logs) {
      const match = parse(line)
      if (match) {
        const [, file, lineNumber, message] = match
        const text = `unused ${message}`
        messages.push(`**${text}** https://github.com/sweatco/${project}/blob/${headSha}/${file}#L${lineNumber}\n`)
      }
    }

    if (messages.length > 0) {
      const header = `There are ${messages.length} unused export${messages.length > 1 ? 's' : ''}`
      CI.log(header)
      fail(
        `${header}${messages.length > ERRORS_LIMIT ? `. Here are the first ${ERRORS_LIMIT} of them` : ''}:\n\n${messages
          .slice(0, ERRORS_LIMIT)
          .join('\n')}`
      )
    } else {
      message(':white_check_mark: ts-prune passed!')
      CI.log('[ts-prune] passed!')
    }
  } catch (error) {
    CI.error(error)
    fail(`[ts-prune]: ${error}`)
  }
}
