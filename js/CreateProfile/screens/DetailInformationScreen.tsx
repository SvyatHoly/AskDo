import { ButtonColor, Colors, NavigationBar, rem, TextStyles } from 'design-system'
import { LeftButtonType, RightButtonType, Button } from 'design-system'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { TextInput } from 'shared/TextInput'
import { ScrollView, TouchableOpacity } from 'react-native'
import { isValidEmail } from 'utils/validators'
import { Navigation } from 'navigation'
import { screens } from '../constants'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context'

export const DetailInformationScreen = () => {
  const [fields, setFields] = useState({ name: '', surname: '', age: null })
  const setField = (field: string, value: string) => {
    setFields({ ...fields, [field]: value })
  }

  const handleNext = () => {
    Navigation.navigate(screens.ChooseSpecializationScreen)
  }
  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <KeyboardAvoidingView>
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
          <Page>
            <ViewContainer>
              <Heading>Detail Information</Heading>
              <BodyM>Tell us about your background</BodyM>
              <RoundedContainer>
                <Vstack>
                  <InputGroup>
                    <LabelM>Work experience</LabelM>
                    <InputContainer>
                      <StyledTextInput
                        value={fields.name}
                        placeholder={'How much years'}
                        onChangeText={(val) => setField('name', val)}
                        isClearButtonMode={true}
                      />
                    </InputContainer>
                  </InputGroup>
                  <InputGroup>
                    <LabelM>About yourself</LabelM>
                    <MultilineInputContainer>
                      <StyledTextInput
                        value={fields.surname}
                        placeholder={
                          'Introduce yourself for future clients. What’s your background and what can you do perfectly?'
                        }
                        onChangeText={(val) => setField('surname', val)}
                        isClearButtonMode={true}
                        multiline={true}
                      />
                    </MultilineInputContainer>
                  </InputGroup>
                </Vstack>
              </RoundedContainer>
            </ViewContainer>
          </Page>
          <ButtonContainer insets={insets}>
            <Button disabled={false} color={ButtonColor.GREY} onPress={handleNext}>
              Next
            </Button>
          </ButtonContainer>
        </KeyboardAvoidingView>
      )}
    </SafeAreaInsetsContext.Consumer>
  )
}

const ButtonContainer = styled.View<{ insets: EdgeInsets | undefined }>`
  padding: ${rem(20)}px;
  box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.1);
  padding-bottom: ${(props) => (props.insets?.bottom ? props.insets?.bottom : 0)}px;
  width: 100%;
  background-color: ${Colors.grayButtonBackground};
  border-top-right-radius: ${rem(15)}px;
  border-top-left-radius: ${rem(15)}px;
`
const KeyboardAvoidingView = styled.KeyboardAvoidingView.attrs({
  behavior: 'padding',
  enabled: true,
})`
  flex: 1;
`

const Page = styled(ScrollView)`
  flex: 1;
  /* justify-content: space-between; */
  background-color: ${Colors.white};
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

const MultilineInputContainer = styled.View`
  flex-direction: row;
  padding-top: ${rem(15)}px;
  padding-bottom: ${rem(15)}px;
  padding-right: ${rem(10)}px;
  border-radius: ${rem(15)}px;
  min-height: ${rem(185)}px;
  background-color: ${Colors.grayForInput};
  justify-content: flex-start;
`
