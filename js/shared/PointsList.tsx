import React, { useEffect, useState } from 'react'
import { LayoutAnimation, LayoutChangeEvent, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { Colors, TextStyles, rem } from 'design-system'

import { useKeyboard } from 'shared/hooks/useKeyboard'
import { useReduceMotion } from 'shared/hooks/useReduceMotion'
import { ChevronIcon } from './icons/ChevronIcon'
import { TextInput } from './TextInput'
import { PlusIcon } from 'shared/icons/PlusIcon'
import { ThreeDotsIcon } from 'shared/icons/ThreeDotsIcon'

interface Props {
  title: string
  points?: Point[]
  didSelectItem: (id: string) => void
  didExpandDropdown?: () => void
  onAdd: () => void
}

interface Point {
  id: string
  title: string
  description: string
}

export const PointsList: React.FC<Props> = ({ title, didSelectItem, didExpandDropdown, onAdd, points = [] }) => {
  const [expanded, setExpanded] = useState(false)
  const [isKeyboardVisible] = useKeyboard()
  const [height, setHeight] = useState(1)
  const [itemsLayoutCounter, setItemsLayoutCounter] = useState(0)

  useEffect(() => {
    if (expanded) {
      didExpandDropdown?.()
    }
  }, [didExpandDropdown, expanded])

  useEffect(() => {
    if (isKeyboardVisible && expanded) {
      toggleExpandedState()
    }
  }, [expanded, isKeyboardVisible])

  const reduceMotion = useReduceMotion()

  const renderHeader = () => {
    return (
      <HeaderContainer>
        <HeaderTitle>{title}</HeaderTitle>
        <Button onPress={onAdd}>
          <PlusIcon />
        </Button>
      </HeaderContainer>
    )
  }

  const renderPoints = (point: Point) => {
    return (
      <HStack key={point.id}>
        <VStack>
          <Body>{point.title}</Body>
          <GrayBody>{point.description}</GrayBody>
        </VStack>

        <Button onPress={() => didSelectItem(point.id)}>
          <ThreeDotsIcon />
        </Button>
      </HStack>
    )
  }

  return (
    <DropdownContainer expanded={expanded} hasSelectedItems={false}>
      <>
        {renderHeader()}
        {points.map((el) => renderPoints(el))}
      </>
    </DropdownContainer>
  )

  function toggleExpandedState() {
    if (!reduceMotion) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }
    if (!expanded) {
      setHeight(1)
      setItemsLayoutCounter(0)
    }
    setExpanded(!expanded)
  }
}

const HStack = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const VStack = styled.View`
  flex-direction: column;
`

const DropdownContainer = styled.View<{ expanded: boolean; hasSelectedItems: boolean }>`
  padding: ${rem(20)}px;
  border-radius: ${rem(15)}px;
  border-width: 1px;
  border-color: ${(props) => (props.hasSelectedItems && !props.expanded ? Colors.normalBlue : Colors.transparent)};
  background-color: ${(props) =>
    props.hasSelectedItems && !props.expanded ? Colors.lightBlue : Colors.greyButtonBackground};
  overflow: hidden;
  width: 100%;
  gap: ${rem(15)}px;
`

const HeaderTitle = styled(TextStyles.LabelL)``

const Body = styled(TextStyles.BodyS)``
const GrayBody = styled(TextStyles.BodyS)`
  color: ${Colors.grayInactive};
`

const HeaderContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const Button = styled(TouchableOpacity).attrs({
  hitSlop: { top: rem(12), right: rem(12), bottom: rem(12), left: rem(12) },
})`
  align-items: center;
  justify-content: center;
  height: ${rem(33)}px;
  width: ${rem(33)}px;
`
