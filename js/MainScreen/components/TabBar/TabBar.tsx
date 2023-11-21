import React from 'react'
import { EdgeInsets } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

import { NavigationItemType } from '../../types'
import { TabBarLayout } from './TabBarLayout'

interface TabBarProps {
  onItemSelect: (prevSelected: NavigationItemType, newSelected: NavigationItemType) => void
  selectedItem: NavigationItemType
  items: NavigationItemType[]
  insets?: EdgeInsets
}

export const TabBar: React.FC<TabBarProps> = ({ onItemSelect, selectedItem, items, insets = null }) => {
  return (
    <Container insets={insets} testID="BottomNavigation" pointerEvents="box-none">
      <TabBarLayout onItemSelect={onItemSelect} selectedItem={selectedItem} tabBarItems={items} />
    </Container>
  )
}

const Container = styled.View<{ insets: EdgeInsets | null }>`
  position: absolute;
  bottom: ${({ insets }) => insets?.bottom ?? 0}px;
  align-items: center;
  justify-content: flex-end;
  align-self: center;
`
