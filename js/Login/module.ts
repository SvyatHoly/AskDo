import { featureModule } from 'utils/modulesRegistry'

import * as constants from './constants'

export const LoginModule = featureModule((registry) =>
  registry
    .addScreen(constants.screens.LoginScreen, () => import('./screens/LoginScreen'))
    .addScreen(constants.screens.ChooseYourRoleScreen, () => import('./screens/ChooseYourRoleScreen'))
    .addScreen(constants.screens.LoginEmailScreen, () => import('./screens/LoginEmailScreen'))
    .addScreen(constants.screens.LoginConfirmScreen, () => import('./screens/LoginConfirmScreen'))
    .addScreen(constants.screens.LoginPasswordScreen, () => import('./screens/LoginPasswordScreen'))
    .addScreen(constants.screens.SignUpScreen, () => import('./screens/SignUpScreen'))
)
