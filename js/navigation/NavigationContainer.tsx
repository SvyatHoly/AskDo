import { DefaultTheme, NavigationContainer, ParamListBase, RouteProp } from '@react-navigation/native'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import React from 'react'
import { Platform } from 'react-native'
import { getScreens } from 'utils/screenRegistry'

import { Navigation, isAnimationDisabled, isModal } from './Navigation'
import { Stack } from './Stack'

const screenOptions = ({ route }: { route: RouteProp<ParamListBase, string> }): NativeStackNavigationOptions => ({
  headerShown: false,
  animation: isAnimationDisabled(route) ? 'none' : isModal(route) ? 'slide_from_bottom' : 'simple_push',
  gestureEnabled: isModal(route) ? false : true,
  customAnimationOnGesture: Platform.OS === 'ios',
})

const SwcTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
}

// Function which is called after the navigation container and all its children finish mounting for the first time.
const onReady = () => {
  Navigation.onNavigationReady()
}

interface NavigationEntryPointProps {
  initialRouteName: keyof ReactNavigation.RootParamList
  additionalScreens?: React.ReactNode | React.ReactNode[]
  popups?: React.ReactNode | React.ReactNode[]
}

export const NavigationEntryPoint = ({ initialRouteName, additionalScreens, popups }: NavigationEntryPointProps) => {
  const screens = getScreens()

  const navContainer = (
    <NavigationContainer theme={SwcTheme} ref={Navigation.navigationRef} onReady={onReady}>
      <Stack.Navigator initialRouteName={initialRouteName} screenOptions={screenOptions}>
        {screens.map(({ name, component, getId }) => (
          <Stack.Screen
            name={name as keyof ReactNavigation.RootParamList}
            component={component}
            key={name as keyof ReactNavigation.RootParamList}
            getId={getId}
          />
        ))}
        {additionalScreens}
      </Stack.Navigator>
      {popups}
    </NavigationContainer>
  )

  return navContainer
}
