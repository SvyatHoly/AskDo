import { Button, Colors, rem, TextStyles } from 'design-system'
import React, { useState } from 'react'
import styled from 'styled-components/native'
import CheckBox from '@react-native-community/checkbox'
import { Navigation } from 'navigation'
import { screens as mainScreens } from 'MainScreen/constants'
import { screens as loginScreens } from 'Login/constants'
import { screens as createProfileScreens } from 'CreateProfile/constants'

export const LoginScreen = () => {
  const [checkBoxValue, setCheckBoxValue] = useState(false)

  const handleMain = () => {
    Navigation.navigate(mainScreens.MainScreen)
  }

  const handleLogin = () => {
    Navigation.navigate(loginScreens.ChooseYourRoleScreen)
  }

  const handleRegistration = () => {
    Navigation.navigate(createProfileScreens.CreateProfileScreen)
  }

  return (
    <VStack>
      <Heading>Navigation</Heading>
      <Button isShadow={true} backgroundColor={Colors.grayButtonBackground} onPress={handleMain}>
        <ButtonText>Main Screen</ButtonText>
      </Button>

      <Button isShadow={true} backgroundColor={Colors.grayButtonBackground} onPress={handleLogin}>
        <ButtonText>Login Path</ButtonText>
      </Button>

      <Button isShadow={true} backgroundColor={Colors.grayButtonBackground} onPress={handleRegistration}>
        <ButtonText>Registration</ButtonText>
      </Button>
    </VStack>
  )
}

const StyledCheckBox = styled(CheckBox)`
  width: ${rem(18)}px;
  height: ${rem(18)}px;
`

const HStack = styled.View`
  flex-direction: row;
  justify-content: center;
  align-self: center;
  gap: ${rem(10)}px;
`

const VStack = styled.View`
  justify-content: center;
  align-self: center;
  flex: 1;
  gap: ${rem(21)}px;
  width: 100%;
  padding: ${rem(12)}px;
`

const Heading = styled(TextStyles.HeadingL)`
  align-self: center;
`

const BodyS = styled(TextStyles.BodyS)``
const ButtonText = styled(TextStyles.LabelM)``
