import { NavigationState, PartialState } from '@react-navigation/native'

type ReactNavigationState = NavigationState | PartialState<NavigationState>

export const findParentOfNearestStack = (
  parent: ReactNavigationState,
  state: ReactNavigationState
): ReactNavigationState | undefined => {
  const index = state.index

  if (index === undefined) {
    return parent
  }

  const route = state.routes[index]

  if (route?.state?.type === 'stack') {
    return findParentOfNearestStack(state, route.state)
  }

  return parent
}
