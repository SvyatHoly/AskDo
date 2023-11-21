import { ParamListBase, RouteProp } from '@react-navigation/native'
import React, { ComponentType, FC, LazyExoticComponent, Suspense } from 'react'

export type PropsOrEmptyObject<P> = P extends undefined ? {} : P

export function wrapScreen<ParamList extends ParamListBase, RouteName extends string = string>(
  Component:
    | ComponentType<PropsOrEmptyObject<ParamList[RouteName]>>
    | LazyExoticComponent<ComponentType<PropsOrEmptyObject<ParamList[RouteName]>>>
    | LazyExoticComponent<FC<PropsOrEmptyObject<ParamList[RouteName]>>>
): ComponentType<{ route: RouteProp<ParamList, RouteName>; navigation: any }>

export function wrapScreen<
  ParamList extends ReactNavigation.RootParamList,
  RouteName extends keyof ReactNavigation.RootParamList
>(
  Component:
    | React.ComponentType<PropsOrEmptyObject<ParamList[RouteName]>>
    | LazyExoticComponent<ComponentType<PropsOrEmptyObject<ParamList[RouteName]>>>
    | LazyExoticComponent<FC<PropsOrEmptyObject<ParamList[RouteName]>>>
): ComponentType<{ route: RouteProp<ParamListBase, RouteName>; navigation: any }>

/**
 * Extracts from "route" prop params and passes them as props
 * <Component {...route.params} />
 */
export function wrapScreen(
  Component: any
): ComponentType<{ route: RouteProp<ParamListBase, string>; navigation: any }> {
  return (props) => {
    const route = props.route
    const params = route.params

    return (
      <Suspense>
        <Component {...props} {...params} />
      </Suspense>
    )
  }
}
