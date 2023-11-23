import React, { useState } from 'react'
import { EdgeInsets, SafeAreaInsetsContext } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { TextStyles, rem, Colors } from 'design-system'

import { CloseIcon } from 'shared/icons/CloseIcon'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Dropdown } from 'shared/Dropdown'

import { SearchIcon } from 'shared/icons/SearchIcon'
import { RoundCloseIcon } from 'shared/icons/RoundCloseIcon'

interface Props {
  onClose: () => void
}
export const FilterTasks: React.FC<Props> = ({ onClose }) => {
  const [value, setValue] = useState('')
  const onEraze = () => {
    setValue('')
  }

  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <>
          <Page insets={insets}>
            <Header>
              <Balancer />
              <TextStyles.BodyL>Find a task</TextStyles.BodyL>
              <CloseButton onPress={onClose}>
                <CloseIcon />
              </CloseButton>
            </Header>
            <Separator />
            <InputContainer>
              <Dropdown
                title={'Courier services'}
                key={'1'}
                dataSource={{
                  1: '1',
                  2: '2',
                  3: '3',
                }}
                initialItem={1}
                placeholder={'placeholder'}
                didSelectItem={setValue}
                didExpandDropdown={() => {}}
              />
            </InputContainer>
          </Page>
        </>
      )}
    </SafeAreaInsetsContext.Consumer>
  )
}

const Balancer = styled.View`
  width: ${rem(30)}px;
  height: ${rem(30)}px;
`

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin: ${rem(12)}px;
`

const ErazeButton = styled(TouchableOpacity).attrs({
  hitSlop: { top: rem(12), right: rem(12), bottom: rem(12), left: rem(12) },
})`
  align-items: center;
  justify-content: center;
  width: ${rem(15)}px;
  height: ${rem(15)}px;
  margin-right: ${rem(20)}px;
`
const CloseButton = styled(TouchableOpacity).attrs({
  hitSlop: { top: rem(12), right: rem(12), bottom: rem(12), left: rem(12) },
})`
  align-items: center;
  justify-content: center;
  width: ${rem(30)}px;
  height: ${rem(30)}px;
`

const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${Colors.greySuperLight};
`
const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${rem(12)}px;
`

const Page = styled.View<{ insets: EdgeInsets | null }>`
  height: 100%;
  width: 100%;
  margin-top: ${(props) => props.insets?.top * 2 ?? 0}px;
  background-color: white;
  border-top-right-radius: ${rem(15)}px;
  border-top-left-radius: ${rem(15)}px;
`