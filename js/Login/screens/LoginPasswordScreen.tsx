import { Colors, NavigationBar, rem, TextStyles } from 'design-system'
import { LeftButtonType, RightButtonType, Button } from 'design-system'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { TextInput } from 'shared/TextInput'
import { TouchableOpacity } from 'react-native'
import { isValidEmail } from 'utils/validators'
import { Navigation } from 'navigation'
import { screens } from 'MainScreen/constants'

export const LoginPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    if (isValidEmail(email) && password.length !== 0) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [email, password])

  const handleNext = () => {
    Navigation.navigate(screens.MainScreen)
  }

  return (
    <Container>
      <NavigationBar
        leftButtonType={LeftButtonType.BACK}
        rightButtonType={RightButtonType.DOTS}
        onLeftButtonPress={() => {
          Navigation.pop()
        }}
        onRightButtonPress={() => {}}
        withBorder={true}
      />
      <ViewContainer>
        <Heading>Log in / Sign up</Heading>
        <RoundedContainer>
          <Vstack>
            <InputGroup>
              <LabelM>E-mail</LabelM>
              <InputContainer>
                <StyledTextInput
                  value={email}
                  placeholder={'Enter e-mail'}
                  onChangeText={setEmail}
                  isClearButtonMode={true}
                />
              </InputContainer>
            </InputGroup>
            <InputGroup>
              <LabelM>Password</LabelM>
              <InputContainer>
                <StyledTextInput
                  value={password}
                  placeholder={'Enter password'}
                  onChangeText={setPassword}
                  isClearButtonMode={true}
                />
              </InputContainer>
            </InputGroup>

            <Button disabled={false} onPress={handleNext}>
              <ButtonText>Log In</ButtonText>
            </Button>
            <StyledTouchable>
              <BodySGrey>Forgot password?</BodySGrey>
              <BodyS>Recover</BodyS>
            </StyledTouchable>
          </Vstack>
        </RoundedContainer>
      </ViewContainer>
    </Container>
  )
}

const Container = styled.View`
  background-color: ${Colors.white};
`

const StyledTouchable = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${rem(5)}px;
`
const InputGroup = styled.View``
const Vstack = styled.View`
  gap: ${rem(20)}px;
`
const ConfirmationInputContainer = styled.View`
  padding-top: ${rem(15)}px;
  padding-bottom: ${rem(15)}px;
`

const ViewContainer = styled.View`
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
  /* color: ${Colors.white}; */
`

const BodyS = styled(TextStyles.BodyS)``

const BodySGrey = styled(TextStyles.BodyS)`
  color: ${Colors.grayInactive};
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
