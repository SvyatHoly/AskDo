import React from 'react'
import { NavigationEntryPoint } from 'navigation/NavigationContainer'
import { screens, MODULE_NAME } from './constants'

const getInitialRouteName = () => {
  return screens.ClientDetailsScreen
}

export const TasksStack = () => {
  return <NavigationEntryPoint initialRouteName={getInitialRouteName()} moduleNames={[MODULE_NAME]} />
}
