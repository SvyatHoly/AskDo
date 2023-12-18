import React from 'react'
import styled from 'styled-components/native'
import { Colors, TextStyles, rem } from 'design-system'
import { TouchableOpacity } from 'react-native'

export interface Item {
  id: string
  isSelected: boolean
  name: string
}

interface Props {
  items: Item[]
  isSelectionAllowed: boolean
  onSelect: (id: string) => void
}
export const BubblePicker: React.FC<Props> = ({ items, isSelectionAllowed = false, onSelect }) => {
  return (
    <Container>
      {items.map((el) => (
        <Item isPicked={el.isSelected} isSelectionAllowed={isSelectionAllowed} onPress={() => onSelect(el.id)}>
          <LabelS>{el.name}</LabelS>
        </Item>
      ))}
    </Container>
  )
}

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${rem(10)}px;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex: 1;
`

const Item = styled(TouchableOpacity)<{ isPicked: boolean; isSelectionAllowed: boolean }>`
  border-radius: ${rem(15)}px;
  background-color: ${({ isPicked, isSelectionAllowed }) =>
    isSelectionAllowed ? (isPicked ? Colors.normalBlue : Colors.white) : Colors.lightBlue};
  padding: ${rem(10)}px;
  border-color: ${Colors.graySuperLight};
  border-width: ${({ isSelectionAllowed }) => (isSelectionAllowed ? 1 : 0)}px;
`

const LabelS = styled(TextStyles.LabelS)``
