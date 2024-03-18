import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import styled from 'styled-components/native'

import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { storeWrapper } from 'utils/store'
import { Navigation } from 'navigation'
import { NavigationEntryPoint } from 'navigation/NavigationContainer'
import { screens as mainScreens, MODULE_NAME as MainScreenModuleName } from 'MainScreen/constants'
import { screens as loginScreens, MODULE_NAME as LoginScreenModuleName } from 'Login/constants'
import { screens as createProfileScreens, MODULE_NAME as CreateProfileModuleName } from 'CreateProfile/constants'

import { MODULE_NAME as ClientProfileModuleName } from 'ClientProfile/constants'
import { Stack } from 'navigation/Stack'
// Function which is called after the navigation container and all its children finish mounting for the first time.
const onReady = () => {
  Navigation.onNavigationReady()
}

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
}

const getInitialRouteName = () => {
  return loginScreens.LoginScreen
}

export const Root = storeWrapper(() => {
  return (
    <GestureRootView>
      <NavigationContainer theme={Theme} ref={Navigation.navigationRef} onReady={onReady}>
        <NavigationEntryPoint
          initialRouteName={getInitialRouteName()}
          /*
      You can add your screens below this comment.
        For example:
        <>
        <Stack.Screen name={screens.Onboarding} component={Test} />
        </>
      */
          additionalScreens={undefined}
          moduleNames={[MainScreenModuleName, LoginScreenModuleName, ClientProfileModuleName, CreateProfileModuleName]}
        />
      </NavigationContainer>
    </GestureRootView>
  )
})

const GestureRootView = styled(GestureHandlerRootView)`
  flex: 1;
`
