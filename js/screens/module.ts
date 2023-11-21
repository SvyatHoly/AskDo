import { featureModule } from 'utils/modulesRegistry'

import { GeneralScreens } from './constants'

export const GeneralScreensModule = featureModule(
  (registry) => registry
  // .addScreen(GeneralScreens.SubscriptionLevels, () => import('screens/SubscriptionLevels'))
  // .addScreen(GeneralScreens.Feedback, () => import('screens/Feedback'))
  // .addScreen(GeneralScreens.Receipt, () => import('screens/Receipt'))
)
