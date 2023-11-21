import {
  CommonActions,
  CommonNavigationAction,
  NavigationState,
  ParamListBase,
  PartialState,
  RouteProp,
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native'
import { NativeModules } from 'react-native'

import { findParentOfNearestStack } from './utils/findParentOfNearestStack'

type AnyParams = Record<string, any>

const setAsModal = (params: object | undefined): AnyParams => {
  return { ...params, __isModal: true }
}

export const disableAnimation = (params: object | undefined): AnyParams => {
  return { ...params, __animation: false }
}

export const isModal = (route: RouteProp<ParamListBase, string>): boolean =>
  (route.params as AnyParams)?.__isModal === true

export const isAnimationDisabled = (route: RouteProp<ParamListBase, string>): boolean =>
  (route.params as AnyParams)?.__animation === false

let pendingAction: CommonNavigationAction | null = null

const navigationRef = createNavigationContainerRef()

const withReadyCheck = (callback: () => void) => {
  return () => {
    if (navigationRef.isReady()) {
      callback()
    }
  }
}

const pushWithReadyCheck = (routeName: string, params: object | undefined) => {
  const action = CommonActions.navigate(routeName, params)
  if (!navigationRef.isReady()) {
    pendingAction = action
  } else {
    navigationRef.dispatch(action)
  }
}

export const Navigation = {
  navigationRef,

  onNavigationReady: () => {
    if (navigationRef.isReady() && pendingAction) {
      navigationRef.dispatch(pendingAction)
      pendingAction = null
    }
  },

  /**
   * Add screen to the nearest active stack
   */
  navigate: <RouteName extends keyof ReactNavigation.RootParamList>(
    ...args: keyof ReactNavigation.RootParamList[RouteName] extends never
      ? [screen: RouteName] | [screen: RouteName, params: undefined]
      : ReactNavigation.RootParamList[RouteName] extends Partial<ReactNavigation.RootParamList[RouteName]>
      ? [screen: RouteName] | [screen: RouteName, params: ReactNavigation.RootParamList[RouteName]]
      : [screen: RouteName, params: ReactNavigation.RootParamList[RouteName]]
  ) => {
    const [screen, params] = args
    pushWithReadyCheck(screen, params as object)
  },

  /**
   * @deprecated use navigate method
   */
  push: <RouteName extends keyof ReactNavigation.RootParamList>(
    ...args: keyof ReactNavigation.RootParamList[RouteName] extends never
      ? [screen: RouteName] | [screen: RouteName, params: undefined]
      : ReactNavigation.RootParamList[RouteName] extends Partial<ReactNavigation.RootParamList[RouteName]>
      ? [screen: RouteName] | [screen: RouteName, params: ReactNavigation.RootParamList[RouteName]]
      : [screen: RouteName, params: ReactNavigation.RootParamList[RouteName]]
  ) => {
    const [screen, params] = args
    pushWithReadyCheck(screen, params as object)
  },

  /**
   * Remove screen from the nearest active stack
   */
  pop: withReadyCheck(() => {
    if (navigationRef.canGoBack()) {
      navigationRef.goBack()
    }
  }),

  /**
   * Reset the nearest active stack
   */
  popToRoot: withReadyCheck(() => {
    if (navigationRef.canGoBack()) {
      navigationRef.dispatch(StackActions.popToTop())
    }
  }),

  /**
   * reset the root stack
   */
  popToAppRoot: withReadyCheck(() => {
    if (navigationRef.canGoBack()) {
      const state = navigationRef.getRootState()
      const firstRoute = state.routes[0]
      navigationRef.resetRoot({
        ...state,
        index: 0,
        routes: firstRoute ? [firstRoute] : [],
      })
    }
  }),

  /**
   * Show screen or stack with modal animation.
   * Note: This method just changes animation.
   */
  showModal: <RouteName extends keyof ReactNavigation.RootParamList>(
    ...args: keyof ReactNavigation.RootParamList[RouteName] extends never
      ? [screen: RouteName] | [screen: RouteName, params: undefined]
      : ReactNavigation.RootParamList[RouteName] extends Partial<ReactNavigation.RootParamList[RouteName]>
      ? [screen: RouteName] | [screen: RouteName, params: ReactNavigation.RootParamList[RouteName] | undefined]
      : [screen: RouteName, params: ReactNavigation.RootParamList[RouteName]]
  ) => {
    const [screen, params] = args
    pushWithReadyCheck(screen, setAsModal(params as object))
  },

  showAndroidSharedComponent: (componentName: string) => {
    NativeModules.SharedComponents?.showSharedComponent(componentName)
  },

  /**
   * Remove the nearest stack from the navigation tree or remove active screen if the nearest stack is the root stack
   */
  dismiss: withReadyCheck(() => {
    if (navigationRef.isReady()) {
      const rootState = navigationRef.getRootState()
      const target = findParentOfNearestStack(rootState, rootState)?.key

      if (target) {
        navigationRef.dispatch({ ...CommonActions.goBack(), target })
      }
    }
  }),

  /**
   * @deprecated use Navigation.dismiss instead
   */
  dismissModal: () => Navigation.dismiss(),

  dismissAll: withReadyCheck(() => {
    const state = navigationRef.getRootState()
    const { index, routes } = state

    if (routes[index]?.state) {
      navigationRef.dispatch({ ...CommonActions.goBack(), target: state.key })
    }
  }),

  resetRoot: (state?: PartialState<NavigationState> | NavigationState) => {
    const action = CommonActions.reset(state)
    if (!navigationRef.isReady()) {
      pendingAction = action
    } else {
      navigationRef.dispatch(action)
    }
  },
}
