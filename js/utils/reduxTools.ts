import { AnyAction, createSelector } from '@reduxjs/toolkit'
export interface StoreDispatcher {
  dispatch(action: AnyAction): void
}

export const createFeatureReducerName =
  <Module extends string>(module: Module) =>
  <Name extends string>(name: Name) =>
    `${module}.${name}` as const

type SelectorsObject = { [key: string]: (...args: any[]) => any }

type SelectorsReturnType<T extends SelectorsObject> = {
  [P in keyof T]: T[P] extends (...args: any[]) => infer R ? R : never
}

/**
 * @deprecated should be used only for mapstateToProps in old class components
 * Do not use it inside functional components
 * Copy of createStructuredSelector form reselect lib
 * https://github.com/reduxjs/reselect/blob/master/src/index.ts#L312C14-L312C38
 */
export function createStructuredSelector<T extends SelectorsObject>(selectors: T, selectorCreator = createSelector) {
  if (typeof selectors !== 'object') {
    throw new Error(
      'createStructuredSelector expects first argument to be an object ' +
        `where each property is a selector, instead received a ${typeof selectors}`
    )
  }
  const objectKeys = Object.keys(selectors)
  /* @ts-expect-error This code leads to the bug! It was suppressed only because it cannot be fixed as part of the "turn on typescript check" task. Pls fix it during refactoring of this part of the code. */
  const resultSelector = selectorCreator(
    objectKeys.map((key) => selectors[key]),
    (...values: any[]) => {
      return values.reduce((composition, value, index) => {
        const objectKey = objectKeys[index]
        if (objectKey) {
          composition[objectKey] = value
        }
        return composition
      }, {})
    }
  )
  return resultSelector as unknown as (...args: any[]) => SelectorsReturnType<T>
}
