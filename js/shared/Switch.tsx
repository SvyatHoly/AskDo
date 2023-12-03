import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { Colors, rem } from 'design-system'

interface Props {
  testID?: string
  value?: boolean
  onValueChange?: (newValue: boolean) => void
}

export const Switch = ({ value = false, onValueChange }: Props) => {
  return (
    <TouchableOpacity onPress={handleClick}>
      <Base on={value}>
        <Circle />
      </Base>
    </TouchableOpacity>
  )

  function handleClick() {
    onValueChange?.(!value)
  }
}

const Base = styled.View<{ on: boolean }>`
  justify-content: center;
  align-items: ${(props) => (props.on ? 'flex-end' : 'flex-start')};
  width: ${rem(46)}px;
  height: ${rem(32)}px;
  border-radius: ${rem(16)}px;
  background-color: ${(props) => (props.on ? Colors.darkTeal : Colors.grayForInput)};
`

const Circle = styled.View`
  filter: drop-shadow(0px 0px 17px rgba(0, 0, 0, 0.05));
  width: ${rem(28)}px;
  height: ${rem(28)}px;
  border-radius: ${rem(16)}px;
  background-color: ${Colors.white};
  margin: ${rem(2)}px;
`
