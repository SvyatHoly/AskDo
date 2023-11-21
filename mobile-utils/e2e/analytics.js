import jestExpect from 'expect'
import { qase } from 'jest-qase-reporter/dist/jest'
import { createRegex, logger } from './logger'

const EVENTS = 'events'
const errors = []

export const trackEvent = (regex) =>
    createRegex(EVENTS, regex, ([, name, params]) => {
      const event = {
        name,
        params: params ? JSON.parse(params) : null,
      }
      const args = ['trackEvent', event.name]
      if (event.params) {
        args.push(event.params)
      }
      console.log(...args)
      return event
    })

export const createAnalytics = (regexes) => logger(regexes)

export const createExpectEvents = (Analytics) => (structure) => {
  try {
    structure = [].concat(structure)
    structure = structure.map((item) => {
      if (typeof item === 'string') {
        item = { name: item }
      }
      return jestExpect.objectContaining(item)
    })
    const events = Analytics.get(EVENTS)
    jestExpect(events).toEqual(jestExpect.arrayContaining(structure))
  } catch (error) {
    errors.push(error)
    console.error(error)
  }
}

export function checkEvents() {
  if (errors.length > 0) {
    const error = errors[0]
    throw new Error(`Analytics event failed\n ${error.message}`)
  }
}

/**
 *
 * @param {string | number | string[] | number[]} caseId common test cases
 * @param {string | number | string[] | number[]} analyticsCaseId analytics test cases. They will fail if at least one of the analytics checks fails.
 * @param {*} testName
 * @param {*} fn
 */
export function itWithAnalytics(caseId, analyticsCaseId, testName, fn) {
  let isFailed = false
  it(qase(caseId, testName), async (...args) => {
    errors.length = 0
    const promise = fn(...args)
    promise.catch(() => {
      isFailed = true
    })
    return promise
  })
  it(qase(analyticsCaseId, `Analytics-${testName}`), async () => {
    if (isFailed) {
      throw new Error(`UI test failed so analytics haven't been tested`)
    }
    checkEvents()
  })
}
