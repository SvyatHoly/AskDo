import { NavigatorScreenParams } from '@react-navigation/native'

import { featureModule } from 'utils/modulesRegistry'

import * as constants from './constants'
// import { NavigationItemType } from './types'

export const ProfileModule = featureModule(
  (registry) => registry.addScreen(constants.screens.ProfileScreen, () => import('./screens/ProfileScreen'))

  // .addScreen<typeof constants.screens.MainScreen, NavigatorScreenParams<Record<NavigationItemType, undefined>>>(
  //   constants.screens.MainScreen,
  //   () => import('./screens/MainScreen')
  // )
)
