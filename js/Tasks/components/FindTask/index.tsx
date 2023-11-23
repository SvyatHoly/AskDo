import React, { useState } from 'react'
import { EdgeInsets, SafeAreaInsetsContext } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { TextStyles, rem, Colors } from 'design-system'

import { CloseIcon } from 'shared/icons/CloseIcon'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { TextInput } from 'shared/TextInput'

import { SearchIcon } from 'shared/icons/SearchIcon'
import { RoundCloseIcon } from 'shared/icons/RoundCloseIcon'

interface Props {
  onClose: () => void
}
export const FindTask: React.FC<Props> = ({ onClose }) => {
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
              <StyledTextInput
                required={true}
                autoFocus={true}
                placeholder={'Enter request'}
                keyboardType="email-address"
                textContentType="emailAddress"
                isValid={true}
                editable={true}
                value={value}
                onChangeText={setValue}
                icon={SearchIcon({})}
              />
              {value.length != 0 ? (
                <ErazeButton onPress={onEraze}>
                  <RoundCloseIcon />
                </ErazeButton>
              ) : null}
            </InputContainer>
          </Page>
        </>
      )}
    </SafeAreaInsetsContext.Consumer>
  )
}

const StyledTextInput = styled(TextInput)`
  flex: 1;
`
const Balancer = styled.View`
  width: ${rem(30)}px;
  height: ${rem(30)}px;
`

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: ${rem(15)}px;
  background-color: ${Colors.greyForInput};
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
