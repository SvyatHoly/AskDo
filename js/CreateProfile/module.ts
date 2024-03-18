import { featureModule } from 'utils/modulesRegistry'

import * as constants from './constants'

export const CreateProfileModule = featureModule((registry) =>
  registry
    .addScreen(constants.screens.CreateProfileScreen, () => import('./screens/CreateProfileScreen'))
    .addScreen(constants.screens.UploadPhotoScreen, () => import('./screens/UploadPhotoScreen'))
    .addScreen(constants.screens.DetailInformationScreen, () => import('./screens/DetailInformationScreen'))
    .addScreen(constants.screens.ChooseSpecializationScreen, () => import('./screens/ChooseSpecializationScreen'))
)
