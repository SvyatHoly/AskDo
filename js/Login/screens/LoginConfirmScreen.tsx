import { Colors, NavigationBar, rem, TextStyles } from 'design-system'
import { LeftButtonType, RightButtonType, Button } from 'design-system'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { ConfirmationInput } from 'shared/ConfirmationInput'
import { Navigation } from 'navigation'
import { screens } from 'Login/constants'

export interface Props {
  mobileNumber: string
  code: number
}
export const LoginConfirmScreen: React.FC<Props> = ({ mobileNumber, code }) => {
  const [isConfirmed, setIsConfirmed] = useState(false)

  const handleNext = () => {
    Navigation.navigate(screens.SignUpScreen)
  }

  const [timer, setTimer] = useState(60)

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0))
    }, 1000)

    return () => clearInterval(countdown)
  }, [])

  const onComplete = (value: number) => {
    if (value === code) {
      setIsConfirmed(true)
    }
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
          <LabelM>Confirm your phone number</LabelM>
          <BodyS>We sent confirmation code on your phone</BodyS>
          <BodyS>+90 238 299 2242</BodyS>

          <ConfirmationInputContainer>
            <ConfirmationInput length={6} onComplete={onComplete} />
          </ConfirmationInputContainer>
          <ResendText>Send code again: {timer} sec</ResendText>
          <Separator />
          <Button disabled={false} onPress={handleNext}>
            <ButtonText>Confirm</ButtonText>
          </Button>
        </RoundedContainer>
      </ViewContainer>
    </Container>
  )
}

const Container = styled.View`
  background-color: ${Colors.white};
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

const ResendText = styled(TextStyles.BodyS)`
  color: ${Colors.grayInactive};
`
