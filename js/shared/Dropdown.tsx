import { FlashList } from '@shopify/flash-list'
import type { FlashListProps } from '@shopify/flash-list'
import React, { useEffect, useMemo, useState } from 'react'
import { LayoutAnimation, LayoutChangeEvent, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { Colors, TextStyles, rem } from 'design-system'

import { useKeyboard } from 'shared/hooks/useKeyboard'
import { useReduceMotion } from 'shared/hooks/useReduceMotion'
import { ChevronIcon } from './icons/ChevronIcon'

import { DropdownListItem } from './DropdownListItem'

interface Item {
  id: string
  name: string
}
interface Props {
  title: string
  dataSource: Item[]
  initialItem?: string
  didSelectItem: (id: string) => void
  didExpandDropdown?: () => void
  isSingleMode?: boolean
}

export const Dropdown: React.FC<Props> = ({
  title,
  dataSource,
  initialItem,
  didSelectItem,
  didExpandDropdown,
  isSingleMode = false,
}) => {
  const [expanded, setExpanded] = useState(false)
  const [selectedItemsMap, setSelectedItemsMap] = useState<{ [fieldName: string]: boolean }>({
    [initialItem ?? 0]: true,
  })
  const [isKeyboardVisible] = useKeyboard()
  const items = useMemo(() => dataSource, [dataSource])
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

  const rowRenderer: FlashListProps<Item>['renderItem'] = ({ item }) => {
    const selected = selectedItemsMap[item.id]
    console.log('🚀 ~ file: Dropdown.tsx:148 ~ item:', item)

    console.log('🚀 ~ file: Dropdown.tsx:58 ~ selected:', selected)
    return (
      <DropdownListItem
        onLayout={handleLayout}
        selected={selected}
        value={item.name}
        onPress={() => handlePress(item.id)}
      />
    )
  }
  const handleLayout = (event: LayoutChangeEvent) => {
    if (itemsLayoutCounter === items.length) {
      return
    }
    setItemsLayoutCounter(items.length)

    setHeight(items.length * event.nativeEvent.layout.height)
  }
  const keyExtractor: FlashListProps<string>['keyExtractor'] = (item) => item.id

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
            extraData={flashListUpdater}
          />
        </>
      ) : (
        renderHeader()
      )}
    </DropdownContainer>
  )

  function handlePress(item: string) {
    if (isSingleMode && selectedItemsMap[item]) {
      return
    }
    didSelectItem(item)

    if (!isSingleMode) {
      setSelectedItemsMap({
        ...selectedItemsMap,
        [item]: !selectedItemsMap[item],
      })
    } else {
      setSelectedItemsMap({
        [item]: !selectedItemsMap[item],
      })
    }

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
    props.hasSelectedItems && !props.expanded ? Colors.lightBlue : Colors.grayButtonBackground};
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
