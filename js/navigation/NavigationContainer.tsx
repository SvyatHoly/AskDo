import { ParamListBase, RouteProp } from '@react-navigation/native'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import React from 'react'
import { Platform } from 'react-native'
import { getScreens } from 'utils/screenRegistry'

import { isAnimationDisabled, isModal } from './Navigation'
import { Stack } from './Stack'

const screenOptions = ({ route }: { route: RouteProp<ParamListBase, string> }): NativeStackNavigationOptions => ({
  headerShown: false,
  animation: isAnimationDisabled(route) ? 'none' : isModal(route) ? 'slide_from_bottom' : 'simple_push',
  gestureEnabled: isModal(route) ? false : true,
  customAnimationOnGesture: Platform.OS === 'ios',
})

interface NavigationEntryPointProps {
  moduleName: string
  initialRouteName: keyof ReactNavigation.RootParamList
  additionalScreens?: React.ReactNode | React.ReactNode[]
  popups?: React.ReactNode | React.ReactNode[]
}

export const NavigationEntryPoint = ({
  moduleName,
  initialRouteName,
  additionalScreens,
  popups,
}: NavigationEntryPointProps) => {
  const screens = getScreens(moduleName)

  const navContainer = (
    <>
      <Stack.Navigator initialRouteName={initialRouteName} screenOptions={screenOptions}>
        {screens &&
          screens.map(({ name, component, getId }) => (
            <Stack.Screen
              name={name as keyof ReactNavigation.RootParamList}
              component={component}
              key={name as keyof ReactNavigation.RootParamList}
              getId={getId}
            />
          ))}
      </Stack.Navigator>
      {popups}
    </>
  )

  return navContainer
}
