import { FlashList } from '@shopify/flash-list'
import type { FlashListProps } from '@shopify/flash-list'
import styled from 'styled-components/native'
import React, { useMemo } from 'react'

import { TaskCard } from './TaskCard'
import { Colors } from 'design-system'
import { Navigation } from 'navigation'
import { screens } from 'Tasks/constants'
interface Props {}

export const TasksList: React.FC<Props> = () => {
  const dataSource = {
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
  }
  const items = useMemo(() => (Array.isArray(dataSource) ? dataSource : Object.values(dataSource)), [dataSource])

  const handleCardTap = (id: string) => {
    Navigation.navigate(screens.TaskDetailsScreen)
  }
  const rowRenderer: FlashListProps<string>['renderItem'] = ({ item }) => {
    return <TaskCard onPress={handleCardTap} />
  }
  const keyExtractor: FlashListProps<string>['keyExtractor'] = (item) => item
  return (
    <Container>
      <FlashList
        data={items}
        nestedScrollEnabled
        estimatedItemSize={350}
        renderItem={rowRenderer}
        keyExtractor={keyExtractor}
        initialScrollIndex={0}
      />
    </Container>
  )
}

const Container = styled.View`
  width: 100%;
  flex: 1;
  background-color: ${Colors.greyButtonBackground};
`
