import React, { useEffect, useState } from 'react'
import { LayoutAnimation, LayoutChangeEvent, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { Colors, TextStyles, rem } from 'design-system'

import { useKeyboard } from 'shared/hooks/useKeyboard'
import { useReduceMotion } from 'shared/hooks/useReduceMotion'
import { ChevronIcon } from './icons/ChevronIcon'
import { TextInput } from './TextInput'

interface Props {
  title: string
  didSelectItem: (item: string) => void
  didExpandDropdown?: () => void
}

export const PriceDropdown: React.FC<Props> = ({ title, didSelectItem, didExpandDropdown }) => {
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

  const expandedHeight = height + rem(45)

  const handleLayout = (event: LayoutChangeEvent) => {
    if (itemsLayoutCounter > 0) {
      return
    }
    setItemsLayoutCounter(itemsLayoutCounter + 1)
    setHeight(height + event.nativeEvent.layout.height)
  }

  const renderHeader = () => {
    return (
      <HeaderContainer>
        <HeaderTitle>{title}</HeaderTitle>
        <ChevronButton onPress={toggleExpandedState}>
          <ChevronIcon isUp={!expanded} />
        </ChevronButton>
      </HeaderContainer>
    )
  }
  return (
    <DropdownContainer expanded={expanded} height={expandedHeight} hasSelectedItems={false}>
      {expanded ? (
        <>
          {renderHeader()}
          <HStack onLayout={handleLayout}>
            <StyledTextInput
              required={true}
              // autoFocus={true}
              placeholder={'From'}
              keyboardType="email-address"
              textContentType="emailAddress"
              isValid={true}
              editable={true}
              // value={'value'}
              onChangeText={() => {}}
            />
            <TextElement> - </TextElement>
            <StyledTextInput
              required={true}
              placeholder={'To'}
              keyboardType="email-address"
              textContentType="emailAddress"
              isValid={true}
              editable={true}
              // value={'value'}
              onChangeText={() => {}}
            />
          </HStack>
        </>
      ) : (
        renderHeader()
      )}
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

const StyledTextInput = styled(TextInput)`
  flex: 1;
  background-color: ${Colors.white};
  border-radius: ${rem(15)}px;
  margin-left: ${rem(10)}px;
  margin-right: ${rem(10)}px;
`

const HStack = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const DropdownContainer = styled.View<{ expanded: boolean; height: number; hasSelectedItems: boolean }>`
  height: ${(props) => (props.expanded ? `${props.height + rem(13)}px` : 'auto')};
  border-radius: ${rem(15)}px;
  border-width: 1px;
  border-color: ${(props) => (props.hasSelectedItems && !props.expanded ? Colors.normalBlue : Colors.transparent)};
  background-color: ${(props) =>
    props.hasSelectedItems && !props.expanded ? Colors.lightBlue : Colors.greyButtonBackground};
  overflow: hidden;
  width: 100%;
`

const HeaderTitle = styled(TextStyles.BodyM)``

const TextElement = styled(TextStyles.BodyM)``

const HeaderContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: ${rem(10)}px;
  padding-top: ${rem(13)}px;
  padding-bottom: ${rem(13)}px;
`

const ChevronButton = styled(TouchableOpacity).attrs({
  hitSlop: { top: rem(12), right: rem(12), bottom: rem(12), left: rem(12) },
})`
  align-items: center;
  justify-content: center;
  height: ${rem(19)}px;
  padding-left: ${rem(15)}px;
  padding-right: ${rem(15)}px;
`
