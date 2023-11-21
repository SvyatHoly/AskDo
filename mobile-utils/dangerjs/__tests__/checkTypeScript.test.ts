import * as fs from 'fs'
import { printTSReport } from '../printTSReport'

const expectedOutput = `There are 1 TypeScript error:

**Type '{}' is not assignable to type 'string'.** https://github.com/sweatco/sweat-wallet/blob/8e80c069733b50c4a235440a7d99448517781555/src/App/hooks/useOnboardingLesson.ts#L22
`
const headSha = '8e80c069733b50c4a235440a7d99448517781555'
const project = 'sweat-wallet'

describe('Test ts error print', () => {
  it('Should print errors of the wallet project (yarn tsc output)', () => {
    const output = `yarn run v1.22.19
$ /sweat-wallet/node_modules/.bin/tsc
src/App/hooks/useOnboardingLesson.ts:22:61 - error TS2322: Type '{}' is not assignable to type 'string'.

22           const lessonResponse = await dispatch(getLesson({ id: onboardingLessonId })).unwrap()
                                                                   ~~

  src/shared/actions/api/getLesson.ts:8:3
    8   id: string
        ~~
    The expected type comes from property 'id' which is declared here on type 'ApiLessonRequest'

Found 1 error in src/App/hooks/useOnboardingLesson.ts:22

error Command failed with exit code 2.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.`
    const fail = jest.fn()

    printTSReport({
      project,
      headSha,
      output,
      fail,
    })

    expect(fail).toHaveBeenCalledWith(expectedOutput)
  })

  it('Should print report from metro.log (metro.log output)', () => {
    const output = fs.readFileSync('./mobile-utils/dangerjs/__tests__/mocked_metro.log', 'utf8')
    const fail = jest.fn()

    printTSReport({
      project,
      headSha,
      output,
      fail,
    })

    expect(fail).toHaveBeenCalledWith(expectedOutput)
  })

  it('Should print report from stdout (yarn tsc > 1', () => {
    const output = `yarn run v1.22.19
$ /sweat-wallet/node_modules/.bin/tsc
src/App/hooks/useOnboardingLesson.ts(22,61): error TS2322: Type '{}' is not assignable to type 'string'.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
`

    const fail = jest.fn()

    printTSReport({
      project,
      headSha,
      output,
      fail,
    })

    expect(fail).toHaveBeenCalledWith(expectedOutput)
  })
})
