import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import styled from 'styled-components/native'

import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { storeWrapper } from 'utils/store'
import { Navigation } from 'navigation'
import { NavigationEntryPoint } from 'navigation/NavigationContainer'
import { screens, MODULE_NAME } from 'MainScreen/constants'

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
  return screens.MainScreen
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
          moduleName={MODULE_NAME}
        />
      </NavigationContainer>
    </GestureRootView>
  )
})

const GestureRootView = styled(GestureHandlerRootView)`
  flex: 1;
`
