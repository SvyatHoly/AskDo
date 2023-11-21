import { Filter } from './icons/Filter'
import { Search } from './icons/Search'
import rem from 'utils/rem'

import { BodyM } from 'design-system/tokens/Text'
import { Button } from 'design-system/atoms/Button'
import { ButtonSize, ButtonType } from 'design-system/atoms/consts'
import styled from 'styled-components/native'
import React from 'react'
import { Colors } from 'design-system/Colors'

export const Filters: React.FC = () => {
  return (
    <Container>
      <IconButton size={ButtonSize.BIG} onPress={() => {}} type={ButtonType.PRIMARY} icon={Search({})} />

      <IconButton size={ButtonSize.BIG} onPress={() => {}} type={ButtonType.PRIMARY} icon={Filter({})} />

      <TextButton size={ButtonSize.BIG} onPress={() => {}} type={ButtonType.PRIMARY}>
        <Text>Price</Text>
      </TextButton>
      <TextButton2 size={ButtonSize.BIG} onPress={() => {}} type={ButtonType.PRIMARY}>
        <Text>Meeting place</Text>
      </TextButton2>
    </Container>
  )
}

const Text = styled(BodyM)`
  color: ${Colors.darkText};
`
const IconButton = styled(Button)`
  align-items: center;
  justify-content: center;
  width: ${rem(50)}px;
  height: ${rem(50)}px;
`

const TextButton = styled(Button)`
  width: ${rem(50)}px;
  height: ${rem(50)}px;
`
const TextButton2 = styled(Button)`
  flex: 1;
`
const Container = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${rem(10)}px;
  padding-left: ${rem(12)}px;
  padding-right: ${rem(12)}px;
`
