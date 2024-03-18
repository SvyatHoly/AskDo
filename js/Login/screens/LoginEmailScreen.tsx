import { screens } from 'Login/constants'
import { Button, ButtonColor, ButtonSize, Colors, NavigationBar, rem, TextStyles } from 'design-system'
import { LeftButtonType, RightButtonType } from 'design-system'
import { Navigation } from 'navigation'
import React, { useState } from 'react'
import { Image, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { TextInput } from 'shared/TextInput'
import styled from 'styled-components/native'
import { isValidEmail } from 'utils/validators'

export const LoginEmailScreen = () => {
  const [email, setEmail] = useState('')

  const handleNext = () => {
    Navigation.navigate(screens.LoginConfirmScreen)
  }

  return (
    <Page>
      <View>
        <NavigationBar
          leftButtonType={LeftButtonType.BACK}
          rightButtonType={RightButtonType.DOTS}
          onLeftButtonPress={() => {
            Navigation.pop()
          }}
          onRightButtonPress={() => {}}
          withBorder={true}
        />
        <Container>
          <Heading>Log in / Sign up</Heading>
          <RoundedContainer>
            <LabelM>Enter phone number or e-mail address</LabelM>
            <InputContainer>
              <StyledTextInput
                value={email}
                placeholder={'Phone number or e-mail'}
                onChangeText={setEmail}
                isClearButtonMode={true}
              />
            </InputContainer>

            <Separator />

            <StyledButton disabled={!isValidEmail(email)} onPress={handleNext} color={ButtonColor.GREY}>
              <ButtonText>Next</ButtonText>
            </StyledButton>
          </RoundedContainer>
        </Container>
      </View>
      <StyledImage source={require('../assets/performers.png')} resizeMode={'contain'} />
    </Page>
  )
}

const ButtonContainer = styled.View`
  padding: ${rem(20)}px;
  /* margin-bottom: ${(props) => (props.insets?.bottom ? props.insets?.bottom + 87 : 87)}px; */
  width: 100%;
  flex: 1;
  border-radius: ${rem(15)}px;
  box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.1);
`

const Page = styled.View`
  width: 100%;
  height: 100%;
  justify-content: space-between;

  background-color: ${Colors.white};

  /* align-items: center; */
`

const StyledImage = styled(Image)`
  align-self: center;
  /* position: absolute;
  bottom: 0; */
  height: ${rem(87)}px;
  width: ${rem(355)}px;
`

const StyledButton = styled(Button)<{ disabled: boolean }>`
  /* background-color: ${({ disabled }) => (disabled ? Colors.grayDark : Colors.normalBlue)}; */
  /* justify-content: center;
  align-items: center;
  border-radius: ${rem(15)}px;
  padding-top: ${rem(15)}px;
  padding-bottom: ${rem(15)}px; */
`
const Container = styled.View`
  padding-left: ${rem(12)}px;
  padding-right: ${rem(12)}px;
  padding-top: ${rem(20)}px;
  gap: ${rem(20)}px;
`

const RoundedContainer = styled.View`
  padding: ${rem(20)}px;
  box-shadow: 0px 0px 17px rgba(0, 0, 0, 0.05);
  border-radius: ${rem(15)}px;
  background-color: ${Colors.white};
`

const StyledTextInput = styled(TextInput)`
  flex: 1;
`
const InputContainer = styled.View`
  flex-direction: row;
  padding-top: ${rem(15)}px;
  padding-bottom: ${rem(15)}px;
  padding-right: ${rem(10)}px;
  border-radius: ${rem(15)}px;

  background-color: ${Colors.grayForInput};
  justify-content: flex-start;
`
const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${Colors.grayForInput};
  margin-top: ${rem(10)}px;
  margin-bottom: ${rem(10)}px;
`

const LabelM = styled(TextStyles.LabelM)`
  padding-bottom: ${rem(5)}px;
`

const Heading = styled(TextStyles.HeadingL)`
  align-self: center;
`

const ButtonText = styled(TextStyles.LabelM)`
  color: ${Colors.white};
`
