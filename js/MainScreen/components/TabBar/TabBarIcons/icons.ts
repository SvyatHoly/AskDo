import { NavigationItemType } from '../../../types'
import { Profile } from './Profile'
import { Tasks } from './Tasks'
import { Chat } from './Chat'

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
      [IconKey.dark]: Tasks,
      [IconKey.light]: Tasks,
      [IconKey.selected]: Tasks,
    },
    [NavigationItemType.Chat]: {
      [IconKey.dark]: Chat,
      [IconKey.light]: Chat,
      [IconKey.selected]: Chat,
    },
    [NavigationItemType.Profile]: {
      [IconKey.dark]: Profile,
      [IconKey.light]: Profile,
      [IconKey.selected]: Profile,
    },
  }

  return icons[tabBarItem]
}
