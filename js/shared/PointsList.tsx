import React, { useEffect, useState } from 'react'
import { LayoutAnimation, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { Colors, TextStyles, rem } from 'design-system'

import { useKeyboard } from 'shared/hooks/useKeyboard'
import { useReduceMotion } from 'shared/hooks/useReduceMotion'
import { PlusIcon } from 'shared/icons/PlusIcon'
import { ThreeDotsIcon } from 'shared/icons/ThreeDotsIcon'
import FastImage from 'react-native-fast-image'
import { BodyS } from 'design-system/tokens/Text'

interface Props {
  title: string
  points?: Point[]
  didSelectItem: (id: string) => void
  didExpandDropdown?: () => void
  onAdd: () => void
}

interface Point {
  id: string
  name: string
  description: string
  photoURLs?: string[]
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
          <Body>{point.name}</Body>
          <GrayBody>{point.description}</GrayBody>
        </VStack>

        <Button onPress={() => didSelectItem(point.id)}>
          {point.photoURLs ? renderPhotos(point.photoURLs) : <ThreeDotsIcon />}
        </Button>
      </HStack>
    )
  }

  const renderPhotos = (photoUrls: string[]) => {
    let arr = []
    let indexShift = 0
    if (photoUrls.length > 3) {
      indexShift = 2
      arr.push(<BodyAbsolute>+ {photoUrls.length - 3}</BodyAbsolute>)
    }
    photoUrls.forEach((el, index) => {
      if (index > 2) {
        return
      }
      arr.push(<StyledFastImage source={{ uri: el }} index={indexShift + index} />)
    })

    return <>{arr}</>
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

const StyledFastImage = styled(FastImage)<{ index: number }>`
  position: absolute;
  width: ${rem(34)}px;
  height: ${rem(34)}px;
  right: ${(props) => rem(props.index * 15)}px;
  border-radius: ${rem(8)}px;
  border-width: ${rem(2)}px;
  border-color: ${Colors.white};
`
const HStack = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const VStack = styled.View`
  flex-direction: column;
  flex-shrink: 1;
`

const DropdownContainer = styled.View<{ expanded: boolean; hasSelectedItems: boolean }>`
  padding: ${rem(20)}px;
  border-radius: ${rem(15)}px;
  border-width: 1px;
  border-color: ${(props) => (props.hasSelectedItems && !props.expanded ? Colors.normalBlue : Colors.transparent)};
  background-color: ${(props) =>
    props.hasSelectedItems && !props.expanded ? Colors.lightBlue : Colors.grayButtonBackground};
  overflow: hidden;
  width: 100%;
  gap: ${rem(15)}px;
`

const HeaderTitle = styled(TextStyles.LabelL)``

const BodyAbsolute = styled(TextStyles.BodyS)`
  position: absolute;
`
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
