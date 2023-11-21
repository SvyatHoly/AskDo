import React from 'react'
import styled from 'styled-components/native'

import { NavigationItemType } from '../../types'
import { TabBarLayout } from './TabBarLayout'

interface TabBarProps {
  onItemSelect: (prevSelected: NavigationItemType, newSelected: NavigationItemType) => void
  selectedItem: NavigationItemType
  items: NavigationItemType[]
}

export const TabBar: React.FC<TabBarProps> = ({ onItemSelect, selectedItem, items }) => {
  return (
    <Container testID="BottomNavigation" pointerEvents="box-none">
      <TabBarLayout onItemSelect={onItemSelect} selectedItem={selectedItem} tabBarItems={items} />
    </Container>
  )
}

const Container = styled.View`
  position: absolute;
  bottom: 0px;
  align-items: center;
  justify-content: flex-end;
  align-self: center;
  width: 100%;
`
