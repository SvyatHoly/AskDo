import React, { useState } from 'react'
import {
  Colors,
  LeftButtonType,
  NavigationBar,
  RightButtonType,
  TextStyles,
  rem,
  Button,
  ButtonColor,
} from 'design-system'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { EdgeInsets, SafeAreaInsetsContext } from 'react-native-safe-area-context'
import { Dropdown } from 'shared/Dropdown'
import { UploadAndViewPhotos } from 'shared/UploadAndViewPhotos'
import { Album, ServiceCategory } from 'Profile/types'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  album?: Album
  services: ServiceCategory[]
  onClose: () => void
  onSave: (value: Album) => void
}
export const AlbumsModal: React.FC<Props> = ({ onClose, onSave, album, services }) => {
  const [projectName, setProjectName] = useState(album?.name)
  const [photos, setPhotos] = useState(album?.photoURLs ?? [])
  const [categotyId, setCategoryId] = useState(album?.category.id ?? services[0].id)

  const handleSave = () => {
    const obj = {
      id: album?.id ?? uuidv4(),
      name: projectName,
      category: services.find((el) => el.id === categotyId),
      photoURLs: photos,
    }
    onSave(obj)
  }

  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <Page insets={insets}>
          <NavigationBar
            ignoreSafeArea={true}
            leftButtonType={LeftButtonType.NONE}
            // onLeftButtonPress={handleBack}
            rightButtonType={RightButtonType.CROSS}
            onRightButtonPress={onClose}
            title="Choose specialization"
          />
          <Separator />
          <SpaceBetween>
            <StyledScrollView>
              <InputContainer>
                <StyledTextInput
                  required={true}
                  placeholder={'Enter the project name'}
                  isValid={true}
                  editable={true}
                  value={projectName}
                  onChangeText={setProjectName}
                />
              </InputContainer>
              <Space />
              {services.length > 1 && (
                <Dropdown
                  isSingleMode={true}
                  title={'What kind of service is this'}
                  // key={'1'}
                  dataSource={services}
                  initialItem={album?.category.id ?? services[0].id}
                  didSelectItem={setCategoryId}
                  didExpandDropdown={() => {}}
                />
              )}

              <Space />
              <TextElement>Upload several photos from your project. Maximum 10 photos</TextElement>
              <Space />
              <UploadAndViewPhotos urls={photos} onChagePhotos={setPhotos} />
              <Space />
            </StyledScrollView>
            <ButtonContainer insets={insets}>
              <Button color={ButtonColor.GREY} onPress={handleSave}>
                <ButtonText>Save</ButtonText>
              </Button>
            </ButtonContainer>
          </SpaceBetween>
        </Page>
      )}
    </SafeAreaInsetsContext.Consumer>
  )
}

const SpaceBetween = styled.View`
  justify-content: space-between;
  flex: 1;
`

const StyledScrollView = styled(ScrollView)`
  padding: ${rem(12)}px;
`

const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${Colors.graySuperLight};
`

const TextElement = styled(TextStyles.BodyM)`
  color: ${Colors.grayInactive};
`

const InputContainer = styled.View`
  flex-direction: row;
  padding-top: ${rem(15)}px;
  padding-bottom: ${rem(15)}px;
  padding-left: ${rem(20)}px;
  padding-right: ${rem(20)}px;

  border-radius: ${rem(15)}px;
  background-color: ${Colors.grayForInput};
  justify-content: flex-start;
`

const ButtonText = styled(TextStyles.BodyM)`
  color: ${Colors.white};
`

const ButtonContainer = styled.View<{ insets: EdgeInsets | undefined }>`
  padding: ${rem(20)}px;
  margin-bottom: ${(props) => (props.insets?.bottom ? props.insets?.bottom : 0)}px;
  width: 100%;
  border-radius: ${rem(15)}px;
  box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.1);
`

const Space = styled.View`
  height: ${rem(30)}px;
`

const StyledTextInput = styled(TextInput)`
  flex: 1;
`

const Page = styled.View<{ insets: EdgeInsets | null }>`
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  min-height: ${rem(630)}px;
  background-color: white;
  border-top-right-radius: ${rem(15)}px;
  border-top-left-radius: ${rem(15)}px;
`
