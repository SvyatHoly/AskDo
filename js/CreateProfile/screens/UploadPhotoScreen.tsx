import { ButtonColor, Colors, NavigationBar, rem, TextStyles } from 'design-system'
import { LeftButtonType, RightButtonType, Button } from 'design-system'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { TextInput } from 'shared/TextInput'
import { TouchableOpacity } from 'react-native'
import { isValidEmail } from 'utils/validators'
import { Navigation } from 'navigation'
import { screens } from '../constants'
import { AddPhoto } from 'shared/AddPhoto'

export const UploadPhotoScreen = () => {
  const [fields, setFields] = useState({ name: '', surname: '', age: null })

  const handleNext = () => {
    Navigation.navigate(screens.DetailInformationScreen)
  }
  return (
    <Page>
      <NavigationBar
        title="Creating profile"
        leftButtonType={LeftButtonType.BACK}
        rightButtonType={RightButtonType.DOTS}
        onLeftButtonPress={() => {
          Navigation.pop()
        }}
        onRightButtonPress={() => {}}
        withBorder={true}
      />
      <ViewContainer>
        <Heading>Upload your photo</Heading>
        <BodyM>
          We will ask you to provide basic information about you so that we can better know which tasks are more
          suitable for you
        </BodyM>
        <RoundedContainer>
          <AddPhoto />
        </RoundedContainer>
        <Button disabled={false} onPress={handleNext} color={ButtonColor.GREY}>
          Next
        </Button>
        <Button backgroundColor={Colors.transparent} onPress={handleNext}>
          <ButtonText>Skip</ButtonText>
        </Button>
      </ViewContainer>
    </Page>
  )
}

const Page = styled.View`
  flex: 1;
  background-color: ${Colors.white};
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

const Heading = styled(TextStyles.HeadingM)``

const ButtonText = styled(TextStyles.LabelM)``

const BodyM = styled(TextStyles.BodyM)``
