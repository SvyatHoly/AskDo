import { FlashList } from '@shopify/flash-list'
import type { FlashListProps } from '@shopify/flash-list'
import React, { useEffect, useMemo, useState } from 'react'
import { LayoutAnimation, LayoutChangeEvent, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { Colors, TextStyles, rem } from 'design-system'

import { useKeyboard } from 'shared/hooks/useKeyboard'
import { useReduceMotion } from 'shared/hooks/useReduceMotion'
import { StringsDictionary } from 'types'
import { ChevronIcon } from './icons/ChevronIcon'

import { DropdownListItem } from './DropdownListItem'

interface Props {
  title: string
  dataSource: string[] | StringsDictionary
  initialItem?: string
  didSelectItem: (item: string) => void
  didExpandDropdown?: () => void
}

export const Dropdown: React.FC<Props> = ({ title, dataSource, initialItem, didSelectItem, didExpandDropdown }) => {
  const [expanded, setExpanded] = useState(false)
  const [selectedItemsMap, setSelectedItemsMap] = useState<{ [fieldName: string]: boolean }>({})
  const [isKeyboardVisible] = useKeyboard()
  const items = useMemo(() => (Array.isArray(dataSource) ? dataSource : Object.values(dataSource)), [dataSource])
  const [height, setHeight] = useState(1)
  const [itemsLayoutCounter, setItemsLayoutCounter] = useState(0)
  const [flashListUpdater, setFlashListUpdater] = useState(false)

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

  const rowRenderer: FlashListProps<string>['renderItem'] = ({ item }) => {
    const selected = selectedItemsMap[item]
    return (
      <DropdownListItem onLayout={handleLayout} selected={selected} value={item} onPress={() => handlePress(item)} />
    )
  }
  const handleLayout = (event: LayoutChangeEvent) => {
    if (itemsLayoutCounter === items.length) {
      return
    }
    setItemsLayoutCounter(items.length)
    console.log(
      '🚀 ~ file: Dropdown.tsx:62 ~ handleLayout ~ event.nativeEvent.layout.height:',
      event.nativeEvent.layout.height
    )

    setHeight(items.length * event.nativeEvent.layout.height)
  }
  const keyExtractor: FlashListProps<string>['keyExtractor'] = (item) => item

  const isAnyValueTrue = (obj: { [s: string]: boolean }) => {
    return Object.values(obj).some((value) => value === true)
  }

  const countTrueValues = (obj: { [s: string]: boolean }) => {
    return Object.values(obj).filter((value) => value === true).length
  }

  const generateTitleString = () => {
    let count = countTrueValues(selectedItemsMap)
    var _title = title
    if (count > 1) {
      _title += ` (${count})`
    }
    return expanded ? title : _title
  }
  const renderHeader = () => {
    return (
      <HeaderContainer>
        <HeaderTitle>{generateTitleString()}</HeaderTitle>
        <ChevronButton onPress={toggleExpandedState}>
          <ChevronIcon isUp={!expanded} />
        </ChevronButton>
      </HeaderContainer>
    )
  }
  return (
    <DropdownContainer expanded={expanded} height={expandedHeight} hasSelectedItems={isAnyValueTrue(selectedItemsMap)}>
      {expanded ? (
        <>
          {renderHeader()}
          <FlashList
            data={items}
            scrollEnabled={false}
            estimatedItemSize={50}
            renderItem={rowRenderer}
            keyExtractor={keyExtractor}
            initialScrollIndex={0}
            // extraData={flashListUpdater}
          />
        </>
      ) : (
        renderHeader()
      )}
    </DropdownContainer>
  )

  function handlePress(item: string) {
    let returnedItem = item
    if (!Array.isArray(dataSource)) {
      returnedItem = Object.keys(dataSource).find((key) => dataSource[key] === item) ?? initialItem ?? ''
    }
    didSelectItem(returnedItem)

    setSelectedItemsMap({
      ...selectedItemsMap,
      [item]: !selectedItemsMap[item],
    })
    setFlashListUpdater(!flashListUpdater)
  }

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
