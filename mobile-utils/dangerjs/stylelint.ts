import { lint } from 'stylelint'
import { Task } from './types'
import { CI } from './utils'

const ERRORS_LIMIT = 100

export const stylelint = (project: string, root: string): Task => async ({ message, fail, danger }) => {
  CI.log('Linting styles...')
  try {
    const files = `./${root}/**/*.ts*`
    const headSha = danger.github.pr.head.sha
    const messages: string[] = []
    const { errored, results } = await lint({ files, cwd: process.cwd() })

    if (!errored) {
      message(':white_check_mark: stylelint passed!')
      CI.log('stylelint passed!')
      return
    }

    for (const result of results) {
      const { warnings, ignored, source } = result
      const file = source?.split(root)[1]

      if (ignored || !file) {
        continue
      }

      for (const { text, line } of warnings) {
        messages.push(`**${text}** https://github.com/sweatco/${project}/blob/${headSha}/${root}${file}#L${line}\n`)
      }
    }

    if (messages.length > 0) {
      const header = `There are ${messages.length} style error${messages.length > 1 ? 's' : ''}`
      CI.log(header)
      fail(
        `${header}${messages.length > ERRORS_LIMIT ? `. Here are the first ${ERRORS_LIMIT} of them` : ''}:\n\n${messages
          .slice(0, ERRORS_LIMIT)
          .join('\n')}`
      )
    } else {
      message(':white_check_mark: stylelint passed!')
      CI.log('stylelint passed!')
    }
  } catch (error) {
    CI.error(error)
    fail(`[stylelint]: ${error}`)
  }
}
