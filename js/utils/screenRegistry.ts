import { ComponentType } from 'react'

import { LazyModule, lazyScreen } from 'navigation/lazyScreen'
import { wrapScreen } from 'navigation/utils'
import { PropsOrEmptyObject } from 'navigation/utils/ScreenWrapper'

const screens: Array<Screen<any>> = []

/**
 * Function to return an unique ID for this screen.
 * Receives an object with the route params.
 * For a given screen name, there will always be only one screen corresponding to an ID.
 * If `undefined` is returned, it acts same as no `getId` being specified.
 */
export type GetScreenId<Props> = ({ params }: { params: Props }) => string | undefined

interface Screen<Name extends keyof ReactNavigation.RootParamList> {
  name: Name
  component: ComponentType<ReactNavigation.RootParamList[Name]>
  getId?: GetScreenId<ReactNavigation.RootParamList[Name]>
}

function addScreen<Name extends keyof ReactNavigation.RootParamList>(
  name: Name,
  component: () => Promise<LazyModule<string, PropsOrEmptyObject<ReactNavigation.RootParamList[Name]>>>,
  getId?: GetScreenId<ReactNavigation.RootParamList[Name]>
) {
  screens.push({
    name,
    component: wrapScreen<ReactNavigation.RootParamList, Name>(lazyScreen(component)),
    getId: getId,
  })
}

function addStack<Name extends keyof ReactNavigation.RootParamList>(
  name: Name,
  component: ComponentType<PropsOrEmptyObject<ReactNavigation.RootParamList[Name]>>,
  getId?: GetScreenId<ReactNavigation.RootParamList[Name]>
) {
  screens.push({
    name,
    component: wrapScreen<ReactNavigation.RootParamList, Name>(component),
    getId: getId,
  })
}

export function getScreens(keys: string[]): Array<Screen<any>> | undefined {
  return screens.filter((el) => keys.includes(extractModuleFromString(el.name)))
}

export const screenRegistry = {
  addScreen,
}

const extractModuleFromString = (input: string): string => {
  const match = input.match(/^screen\/([^/]+)\/[^/]+$/)
  return match ? match[1]! : ''
}
