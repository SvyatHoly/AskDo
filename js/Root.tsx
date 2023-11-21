import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import styled from 'styled-components/native'

import { screens } from 'MainScreen/constants'

import { NavigationEntryPoint } from 'navigation/NavigationContainer'
import { storeWrapper } from 'utils/store'

const getInitialRouteName = () => {
  return screens.MainScreen
}

export const Root = storeWrapper(() => (
  <GestureRootView>
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
    />
  </GestureRootView>
))

const GestureRootView = styled(GestureHandlerRootView)`
  flex: 1;
`
