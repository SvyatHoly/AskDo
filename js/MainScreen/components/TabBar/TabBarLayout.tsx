import React, { useCallback, useRef } from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
// import { Colors, rem } from 'sweatcoin-design-system'

import { assertUnreachable } from 'utils/UnreachableCaseError'
import { triggerHaptic } from 'utils/hapticFeedback'

import { NavigationItemType } from '../../types'
import { BottomNavigationShadow } from './BottomNavigationShadow'
import { IconKey, useMapNavigationItemTypeToIcons } from './TabBarIcons/icons'

interface Props {
  onItemSelect: (prevSelected: NavigationItemType, newSelected: NavigationItemType) => void
  selectedItem: NavigationItemType
  tabBarItems: NavigationItemType[]
}

export const TabBarLayout: React.FC<Props> = ({ onItemSelect, selectedItem, tabBarItems }) => {
  const prevSelectedItemRef = useRef(selectedItem)
  prevSelectedItemRef.current = selectedItem
  const handleItemSelect = useCallback(
    (item: NavigationItemType) => {
      triggerHaptic('selection', { enableVibrateFallback: false })
      onItemSelect(prevSelectedItemRef.current, item)
    },
    [onItemSelect]
  )

  return (
    <Layout>
      {/* <BottomNavigationShadow /> */}
      {tabBarItems.map(renderItem)}
    </Layout>
  )

  function renderItem(item: NavigationItemType) {
    const isSelected = selectedItem === item
    const iconKey = isSelected ? IconKey.selected : IconKey.light

    return (
      <TabBarItem
        key={`item-${item}`}
        iconKey={iconKey}
        item={item}
        onSelect={handleItemSelect}
        isSelected={isSelected}
      />
    )
  }
}

interface TabBarItemProps {
  item: NavigationItemType
  onSelect(item: NavigationItemType): void
  iconKey: IconKey
  isSelected: boolean
}

const TabBarItem = React.memo(({ item, onSelect, iconKey, isSelected }: TabBarItemProps) => {
  const icons = useMapNavigationItemTypeToIcons(item)
  const Icon = icons?.[iconKey]

  if (Icon == null) {
    return null
  }
  return (
    <TabBarButton onPress={() => onSelect(item)}>
      <Icon isSelected={isSelected} />
    </TabBarButton>
  )
})

const Layout = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: red;
`

const TabBarButton = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
`

/* border-radius: ${rem(28)}px; */
/* padding: ${rem(4)}px ${rem(20)}px; */
/* background: ${({ isDarkModeEnabled }) => (isDarkModeEnabled ? Colors.classicBlue : Colors.white)}; */
/* gap: ${rem(16)}px; */

// hitSlop: { top: rem(12), right: rem(12), bottom: rem(12), left: rem(12) },

/* width: ${rem(48)}px;
  height: ${rem(48)}px; */
