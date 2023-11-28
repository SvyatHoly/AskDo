import { NavigatorScreenParams } from '@react-navigation/native'

import { featureModule } from 'utils/modulesRegistry'

import * as constants from './constants'
// import { NavigationItemType } from './types'

export const TasksModule = featureModule(
  (registry) =>
    registry
      .addScreen(constants.screens.TasksScreen, () => import('./screens/TasksScreen'))
      .addScreen(constants.screens.TaskDetailsScreen, () => import('./screens/TaskDetailsScreen'))

  // .addScreen<typeof constants.screens.MainScreen, NavigatorScreenParams<Record<NavigationItemType, undefined>>>(
  //   constants.screens.MainScreen,
  //   () => import('./screens/MainScreen')
  // )
)
