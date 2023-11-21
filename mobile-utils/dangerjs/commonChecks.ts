import type { Task } from './types'

const bigPRThreshold = 800

export const commonChecks =
  (functionName: string): Task =>
  async ({ danger, warn, markdown, message }) => {
    const branchName = danger.github.pr.head.ref
    const changes = danger.github.pr.additions + danger.github.pr.deletions
    if (changes > bigPRThreshold) {
      warn(':exclamation: Big PR')
      markdown(
        '> Pull Request size seems relatively large. If Pull Request contains multiple changes, split each into separate PR will helps faster, easier review.'
      )
    }
    const isFeature = branchName.includes('feature')
    if (isFeature) {
      const analyticEvents = Array<string>()

      const filePaths = [...danger.git.created_files, ...danger.git.modified_files]
      for (const filePath of filePaths) {
        const lines = (await danger.git.diffForFile(filePath))?.added.split(/\r?\n/) ?? []

        for (const line of lines) {
          const eventName = line.match(
            new RegExp(`${functionName}(?:WithParams)?(?!\\(\\?:WithParams\\))\\(([^,)]*).*\\)`)
          )?.[1]

          if (eventName) {
            analyticEvents.push(eventName)
          }
        }
      }

      if (analyticEvents.length > 0) {
        message(
          '<details><summary>Analytic events</summary>\n\n' +
            analyticEvents.map((e) => `\`${e}\``).join('\n') +
            '\n\n</details>'
        )
      } else {
        warn('There is no analytics for this feature. Are you sure you have everything in place?')
      }
    }
  }
