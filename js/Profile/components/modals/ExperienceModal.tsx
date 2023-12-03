import React, { useState } from 'react'
import { EdgeInsets, SafeAreaInsetsContext } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { TextStyles, rem, Colors, Button } from 'design-system'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import { CloseIcon } from 'shared/icons/CloseIcon'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { TextInput } from 'shared/TextInput'
import { Switch } from 'shared/Switch'

import { ScrollView } from 'react-native'
import { AddPhoto } from '../AddPhoto'
import { Experience, ExperienceType } from 'Profile/types'
import moment from 'moment'

interface Props {
  label: string
  type: ExperienceType
  text: string
  data?: Experience
  onClose: () => void
  onSave: (value: Experience) => void
}
export const ExperienceModal: React.FC<Props> = ({ label, type, text, data, onClose, onSave }) => {
  const [value, setValue] = useState(data)
  const [startDate, setStartDate] = useState(data && moment.unix(data.startDate).format('DD/MM/YYYY'))
  const [finishDate, setFinishDate] = useState(
    data && data.finishDate && moment.unix(data.finishDate).format('DD/MM/YYYY')
  )
  const [inProgress, setInProgress] = useState(false)

  const onSet = (name: string) => {
    setValue({ ...value, name })
  }

  const formatString = (inputText: string) => {
    // Remove non-numeric characters
    const numericInput = inputText.replace(/[^\d]/g, '')
    // Format the input with slashes (dd/MM/YYYY)
    let formattedText = ''
    for (let i = 0; i < numericInput.length; i++) {
      if (i === 2 || i === 4) {
        formattedText += '/'
      }
      formattedText += numericInput[i]
    }
    return formattedText
  }

  const handleSave = () => {
    const format = 'DD/MM/YYYY'
    const id = value?.id ? value.id : uuidv4()
    let _value = {
      ...value,
      id: value?.id ? value.id : uuidv4(),
      type: type,
      startDate: moment(startDate, format).unix(),
      finishDate: inProgress ? null : moment(finishDate, format).unix(),
    }
    onSave(_value)
  }
  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <Page insets={insets}>
          <Header>
            <Balancer />
            <TextStyles.BodyL>{label}</TextStyles.BodyL>
            <CloseButton onPress={onClose}>
              <CloseIcon />
            </CloseButton>
          </Header>
          <Separator />
          <Container>
            <StyledScrollView
              contentContainerStyle={{
                paddingBottom: rem(200),
              }}>
              <VStack>
                <LabelM>Educational institution, specialization</LabelM>
                <BodyM>If you have several educations, create separate sections for each</BodyM>
                <InputContainer>
                  <StyledTextInput
                    multiline={false}
                    placeholder={'Enter the name of the educational institution'}
                    isValid={true}
                    editable={true}
                    value={value?.name}
                    onChangeText={onSet}
                  />
                </InputContainer>
              </VStack>
              <Space />
              <VStack>
                <LabelM>Education period</LabelM>
                <BodyM>If you have several educations, create separate sections for each</BodyM>
                <HStack>
                  <InputPriceContainer>
                    <StyledTextInput
                      required={true}
                      placeholder={'Start date'}
                      isValid={true}
                      editable={true}
                      value={startDate}
                      onChangeText={(val) => setStartDate(formatString(val))}
                    />
                  </InputPriceContainer>

                  <TextElement> - </TextElement>
                  <InputPriceContainer>
                    <StyledTextInput
                      required={true}
                      placeholder={'Finish date'}
                      isValid={true}
                      editable={true}
                      value={finishDate}
                      onChangeText={(val) => setFinishDate(formatString(val))}
                    />
                  </InputPriceContainer>
                </HStack>
                <MiniHStack>
                  <BodyM>Still study there</BodyM>
                  <Switch value={inProgress} onValueChange={(val) => setInProgress(val)} />
                </MiniHStack>
              </VStack>
              <Space />
              <VStack>
                <LabelM>Diploma photo</LabelM>
                <AddPhoto photoUri={value?.photoUrl} />
                <MiniHStack>
                  <BodyM>Show my diploma to clients</BodyM>
                  <Switch
                    value={value?.showPhotoToClients}
                    onValueChange={(val) => setValue({ ...value, showPhotoToClients: val })}
                  />
                </MiniHStack>
              </VStack>
            </StyledScrollView>
          </Container>
          <ButtonContainer insets={insets}>
            <Button backgroundColor={Colors.normalBlue} onPress={handleSave}>
              <ButtonText>Save</ButtonText>
            </Button>
          </ButtonContainer>
        </Page>
      )}
    </SafeAreaInsetsContext.Consumer>
  )
}

const Container = styled.View`
  flex-shrink: 1;
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
const Balancer = styled.View`
  width: ${rem(30)}px;
  height: ${rem(30)}px;
`

const StyledScrollView = styled(ScrollView)`
  padding: ${rem(12)}px;
`
const TextElement = styled(TextStyles.BodyM)``

const ButtonText = styled(TextStyles.BodyM)`
  color: ${Colors.white};
`
const LabelM = styled(TextStyles.LabelM)``

const BodyM = styled(TextStyles.BodyM)`
  color: ${Colors.grayInactive};
`
const HStack = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: ${rem(50)}px;
  gap: ${rem(10)}px;
`

const MiniHStack = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const InputPriceContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: ${rem(15)}px;
  background-color: ${Colors.grayForInput};
  flex: 1;
  height: ${rem(50)}px;
`

const VStack = styled.View`
  gap: ${rem(10)}px;
`
const ButtonContainer = styled.View<{ insets: EdgeInsets | undefined }>`
  position: absolute;
  bottom: ${(props) => props.insets?.bottom * 2}px;
  width: 100%;
  padding-left: ${rem(20)}px;
  padding-right: ${rem(20)}px;
  background-color: ${Colors.transparent};
  border-radius: ${rem(15)}px;
  box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.1);
`

const Space = styled.View`
  height: ${rem(30)}px;
`

const StyledTextInput = styled(TextInput)`
  flex: 1;
`

const InputContainer = styled.View`
  flex-direction: row;
  padding-top: ${rem(15)}px;
  padding-bottom: ${rem(15)}px;
  border-radius: ${rem(15)}px;
  background-color: ${Colors.grayForInput};
  justify-content: flex-start;
`

const Page = styled.View<{ insets: EdgeInsets | null }>`
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  max-height: 100%;
  margin-top: ${(props) => props.insets?.top * 2 ?? 0}px;
  border-top-right-radius: ${rem(15)}px;
  border-top-left-radius: ${rem(15)}px;
  background-color: white;
`
