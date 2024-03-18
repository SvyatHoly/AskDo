import { Button, Colors, rem, TextStyles } from 'design-system'
import React, { useState } from 'react'
import styled from 'styled-components/native'
import CheckBox from '@react-native-community/checkbox'
import { Navigation } from 'navigation'
import { screens } from 'Login/constants'

export const ChooseYourRoleScreen = () => {
  const [checkBoxValue, setCheckBoxValue] = useState(false)
  const handleSelectPerformer = () => {
    Navigation.navigate(screens.LoginEmailScreen)
  }

  const handleSelectClient = () => {}
  const handleMain = () => {}
  return (
    <VStack>
      <Heading>Choose your role</Heading>
      <Button isShadow={true} backgroundColor={Colors.grayButtonBackground} onPress={handleSelectPerformer}>
        <ButtonText>I’m looking for the task</ButtonText>
      </Button>

      <Button isShadow={true} backgroundColor={Colors.grayButtonBackground} onPress={handleSelectClient}>
        <ButtonText>I have a task</ButtonText>
      </Button>
      <HStack>
        <StyledCheckBox
          animationDuration={0.1}
          disabled={false}
          value={checkBoxValue}
          boxType="square"
          onValueChange={(newValue) => setCheckBoxValue(newValue)}
        />
        <BodyS>Remember my choice</BodyS>
      </HStack>
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
  background-color: ${Colors.white};
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
