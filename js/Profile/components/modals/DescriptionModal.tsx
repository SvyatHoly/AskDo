import React, { useState } from 'react'
import { EdgeInsets, SafeAreaInsetsContext } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { TextStyles, rem, Colors, Button } from 'design-system'

import { CloseIcon } from 'shared/icons/CloseIcon'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { TextInput } from 'shared/TextInput'

interface Props {
  text: string
  onClose: () => void
  onSave: (value: string) => void
}
export const DescriptionModal: React.FC<Props> = ({ text, onClose, onSave }) => {
  const [value, setValue] = useState(text)

  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <>
          <Page insets={insets}>
            <Header>
              <Balancer />
              <TextStyles.BodyL>Description</TextStyles.BodyL>
              <CloseButton onPress={onClose}>
                <CloseIcon />
              </CloseButton>
            </Header>
            <Separator />
            <InputContainer>
              <StyledTextInput
                multiline={true}
                autoFocus={true}
                placeholder={
                  'Introduce yourself for future clients. What’s your background and what can you do perfectly?'
                }
                keyboardType="email-address"
                isValid={true}
                editable={true}
                value={value}
                onChangeText={setValue}
              />
            </InputContainer>
            <ButtonContainer insets={insets}>
              <Button
                backgroundColor={Colors.normalBlue}
                onPress={() => {
                  onSave(value)
                }}>
                <ButtonText>Save</ButtonText>
              </Button>
            </ButtonContainer>
          </Page>
        </>
      )}
    </SafeAreaInsetsContext.Consumer>
  )
}

const ButtonText = styled(TextStyles.BodyM)`
  color: ${Colors.white};
`

const ButtonContainer = styled.View<{ insets: EdgeInsets | undefined }>`
  padding: ${rem(20)}px;
  margin-bottom: ${(props) => (props.insets?.bottom ? props.insets?.bottom + 87 : 87)}px;
  width: 100%;
  flex: 1;
  border-radius: ${rem(15)}px;
  box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.1);
`

const StyledTextInput = styled(TextInput)`
  flex: 1;
`
const Balancer = styled.View`
  width: ${rem(30)}px;
  height: ${rem(30)}px;
`

const InputContainer = styled.View`
  flex-direction: row;
  padding-top: ${rem(15)}px;
  padding-bottom: ${rem(15)}px;
  border-radius: ${rem(15)}px;
  background-color: ${Colors.grayForInput};
  margin: ${rem(12)}px;
  height: ${rem(185)}px;
  justify-content: flex-start;
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
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  background-color: white;
  border-top-right-radius: ${rem(15)}px;
  border-top-left-radius: ${rem(15)}px;
`
