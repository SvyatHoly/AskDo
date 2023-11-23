import React, { ReactNode } from 'react'
import styled from 'styled-components/native'
import { Colors, TextStyles, rem } from 'design-system'
import { LayoutChangeEvent } from 'react-native'

interface Props {
  onLayout: (_: LayoutChangeEvent) => void
  selected?: boolean
  onPress?: () => void
  value: string
  children?: ReactNode
}

export const DropdownListItem = ({ selected = false, value, onPress, onLayout }: Props) => {
  return (
    <Container onLayout={onLayout}>
      <BorderContainer onPress={onPress} isSelected={selected}>
        <Title>{value}</Title>
      </BorderContainer>
    </Container>
  )
}

const Container = styled.View`
  padding-left: ${rem(10)}px;
  padding-right: ${rem(10)}px;
`

const BorderContainer = styled.Pressable<{ isSelected?: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: ${rem(15)}px;
  padding-left: ${rem(10)}px;
  padding-right: ${rem(10)}px;
  padding-top: ${rem(13)}px;
  padding-bottom: ${rem(13)}px;
  border-width: 1px;
  border-color: ${(props) => (props.isSelected ? Colors.normalBlue : Colors.transparent)};
  background-color: ${(props) => (props.isSelected ? Colors.lightBlue : Colors.white)};
  margin-top: ${rem(10)}px;
`

const Title = styled(TextStyles.BodyM)`
  color: ${Colors.darkBlue};
`
