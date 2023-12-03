import React from 'react'
import { NavigationEntryPoint } from 'navigation/NavigationContainer'
import { screens, MODULE_NAME } from './constants'

const getInitialRouteName = () => {
  return screens.ProfileScreen
}

export const ProfileStack = () => {
  return <NavigationEntryPoint initialRouteName={getInitialRouteName()} moduleNames={[MODULE_NAME]} />
}
