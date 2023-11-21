import { NavigationItemType } from '../../../types'
import { MarketDark } from './MarketDark'
import { MarketLight } from './MarketLight'
import { MarketSelected } from './MarketSelected'
import { SocialDark } from './SocialDark'
import { SocialLight } from './SocialLight'
import { SocialSelected } from './SocialSelected'
import { WalletDark } from './WalletDark'
import { WalletLight } from './WalletLight'
import { WalletSelected } from './WalletSelected'

export enum IconKey {
  dark = 'dark',
  light = 'light',
  selected = 'selected',
}

type ElementIcons = Record<IconKey, React.FC<{ isSelected?: boolean }>>
type IconsSet = Record<NavigationItemType, ElementIcons>

export const useMapNavigationItemTypeToIcons = (tabBarItem: NavigationItemType) => {
  const icons: IconsSet = {
    [NavigationItemType.Tasks]: {
      [IconKey.dark]: MarketDark,
      [IconKey.light]: MarketDark,
      [IconKey.selected]: MarketDark,
    },
    [NavigationItemType.Chat]: {
      [IconKey.dark]: MarketDark,
      [IconKey.light]: MarketDark,
      [IconKey.selected]: MarketDark,
    },
    [NavigationItemType.Profile]: {
      [IconKey.dark]: MarketDark,
      [IconKey.light]: MarketDark,
      [IconKey.selected]: MarketDark,
    },
  }

  return icons[tabBarItem]
}
