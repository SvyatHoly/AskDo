import React from 'react'
import { NavigationEntryPoint } from 'navigation/NavigationContainer'
import { screens, MODULE_NAME } from './constants'

const getInitialRouteName = () => {
  return screens.TasksScreen
}

export const TasksStack = () => {
  console.log('🚀 ~ file: TasksStack.tsx:12 ~ TasksStack ~ MODULE_NAME:', MODULE_NAME)

  return <NavigationEntryPoint initialRouteName={getInitialRouteName()} moduleName={MODULE_NAME} />
}
