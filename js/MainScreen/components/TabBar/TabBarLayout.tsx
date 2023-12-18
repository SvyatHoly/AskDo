import React, { useCallback, useRef } from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

import { Footnote } from 'design-system/tokens/Text'
import { Colors, rem } from 'design-system'

import { triggerHaptic } from 'utils/hapticFeedback'

import { NavigationItemType } from '../../types'
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

  return <Layout>{tabBarItems.map(renderItem)}</Layout>

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
      <Title isSelected={isSelected}>{item}</Title>
    </TabBarButton>
  )
})

const Layout = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  height: ${rem(85)}px;
  width: 100%;
  gap: ${rem(37)}px;
  border-top-right-radius: ${rem(15)}px;
  border-top-left-radius: ${rem(15)}px;
  border: 1px solid ${Colors.graySuperLight};
  padding: ${rem(10)}px;
  background-color: ${Colors.white};
`

const TabBarButton = styled(TouchableOpacity).attrs({
  hitSlop: { top: rem(12), right: rem(12), bottom: rem(12), left: rem(12) },
})`
  align-items: center;
  justify-content: center;
  width: ${rem(50)}px;
  height: ${rem(50)}px;
`

const Title = styled(Footnote)<{ isSelected: boolean }>`
  color: ${({ isSelected }) => (isSelected ? Colors.darkBlue : Colors.grayInactive)};
`
