import { screens } from 'MainScreen/constants'
import { NavigationItemType } from 'MainScreen/types'
// import { screens as profileScreens } from 'Profile/constants'
import { store } from 'utils/store'

import { Navigation } from './Navigation'

export class Shortcuts {
  public static get Tabs() {
    return {
      // openTodayTab() {
      //   Navigation.navigate(screens.MainScreen, { screen: NavigationItemType.Today })
      // },
      // openMarketplaceTab() {
      //   Navigation.navigate(screens.MainScreen, { screen: NavigationItemType.Marketplaces })
      // },
      // openWalletTab() {
      //   Navigation.navigate(screens.MainScreen, { screen: NavigationItemType.Wallet })
      // },
      // openSocialTab() {
      //   Navigation.navigate(screens.MainScreen, { screen: NavigationItemType.Social })
      // },
      // openSFWTab() {
      //   Navigation.navigate(screens.MainScreen, { screen: NavigationItemType.SFW })
      // },
      // openPathTab() {
      //   Navigation.navigate(screens.MainScreen, { screen: NavigationItemType.Path })
      // },
      // openRabotnikTab() {
      //   Navigation.navigate(screens.MainScreen, { screen: NavigationItemType.Rabotnik })
      // },
      // openRewardsHub() {
      //   Navigation.navigate(screens.MainScreen, { screen: NavigationItemType.RewardsHub })
      // },
    }
  }

  public static openProfile(userId?: string | number) {
    // Navigation.navigate(profileScreens.ProfileScreen, { userId: userId ?? meId() })
  }
}
