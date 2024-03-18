import { Colors, NavigationBar, rem, TextStyles } from 'design-system'
import { LeftButtonType, RightButtonType, Button } from 'design-system'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { TextInput } from 'shared/TextInput'
import { TouchableOpacity } from 'react-native'
import { isValidEmail } from 'utils/validators'
import { Navigation } from 'navigation'
import { screens } from '../constants'

export const CreateProfileScreen = () => {
  const [fields, setFields] = useState({ name: '', surname: '', age: null })
  const setField = (field: string, value: string) => {
    setFields({ ...fields, [field]: value })
  }

  const handleNext = () => {
    Navigation.navigate(screens.UploadPhotoScreen)
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
        <Heading>Let's get to know each other better</Heading>
        <BodyM>
          We will ask you to provide basic information about you so that we can better know which tasks are more
          suitable for you
        </BodyM>
        <RoundedContainer>
          <Vstack>
            <InputGroup>
              <LabelM>Name</LabelM>
              <InputContainer>
                <StyledTextInput
                  value={fields.name}
                  placeholder={'Enter your name'}
                  onChangeText={(val) => setField('name', val)}
                  isClearButtonMode={true}
                />
              </InputContainer>
            </InputGroup>
            <InputGroup>
              <LabelM>Surname</LabelM>
              <InputContainer>
                <StyledTextInput
                  value={fields.surname}
                  placeholder={'Enter your surname'}
                  onChangeText={(val) => setField('surname', val)}
                  isClearButtonMode={true}
                />
              </InputContainer>
            </InputGroup>
            <InputGroup>
              <LabelM>Age</LabelM>
              <InputContainer>
                <StyledTextInput
                  value={fields.age}
                  placeholder={'Enter your age'}
                  onChangeText={(val) => setField('age', val)}
                  isClearButtonMode={true}
                />
              </InputContainer>
            </InputGroup>
            <Separator />
            <Button disabled={false} onPress={handleNext}>
              <ButtonText>Next</ButtonText>
            </Button>
          </Vstack>
        </RoundedContainer>
      </ViewContainer>
    </Page>
  )
}

const Page = styled.View`
  flex: 1;
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
  gap: ${rem(10)}px;
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
`

const LabelM = styled(TextStyles.LabelM)`
  padding-bottom: ${rem(5)}px;
`

const Heading = styled(TextStyles.HeadingM)``

const ButtonText = styled(TextStyles.LabelM)``

const BodyM = styled(TextStyles.BodyM)``

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
