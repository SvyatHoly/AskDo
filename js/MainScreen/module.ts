import { NavigatorScreenParams } from '@react-navigation/native'

import { featureModule } from 'utils/modulesRegistry'

import * as constants from './constants'
// import { NavigationItemType } from './types'

export const MainModule = featureModule(
  (registry) => registry.addScreen(constants.screens.MainScreen, () => import('./screens/MainScreen'))

  // .addScreen<typeof constants.screens.MainScreen, NavigatorScreenParams<Record<NavigationItemType, undefined>>>(
  //   constants.screens.MainScreen,
  //   () => import('./screens/MainScreen')
  // )
)
