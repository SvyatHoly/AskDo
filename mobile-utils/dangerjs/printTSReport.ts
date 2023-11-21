interface BuildReportConfig {
  project: string
  headSha: string
  output: string
  fail: (message: string) => void
}

interface ErrorOccurrence {
  file: string
  line: string
  column: string
  message: string
}

const ERRORS_LIMIT = 100

const parse = (line: string) => {
  let result = /^(.*):(.*):(.*) - error [^:]*: (.*)/.exec(line)

  if (!result) {
    result = /^(.*)\((.*),(.*)\): error [^:]*: (.*)/.exec(line)
  }

  return result
}

export function printTSReport({ project, headSha, output, fail }: BuildReportConfig) {
  // eslint-disable-next-line no-control-regex
  const logs = output.replace(/\x1B\[([0-9]{1,3}(;[0-9]{1,2};?)?)?[mGK]/g, '')

  const errors = logs.split('\n').reduce((acc, line) => {
    const match = parse(line)
    
    if (match) {
      const [, file, line, column, message] = match

      if (file && line && column && message) {
        acc.push({
          file,
          line,
          column,
          message,
        })
      }
    }

    return acc
  }, Array<ErrorOccurrence>())

  const messages = errors.map(
    (error) =>
      `**${error.message}** https://github.com/sweatco/${project}/blob/${headSha}/${error.file}#L${error.line}\n`
  )

  if (messages.length > 0) {
    fail(
      `There are ${messages.length} TypeScript error${messages.length > 1 ? 's' : ''}${
        messages.length > ERRORS_LIMIT ? '. Here are the first 100 of them' : ''
      }:\n\n${messages.slice(0, ERRORS_LIMIT).join('\n')}`
    )
  }
}
