import React, { useState } from 'react'
import { Alert } from 'react-native'
import { launchImageLibrary, MediaType, PhotoQuality } from 'react-native-image-picker'
import styled from 'styled-components/native'
import { PlusIcon } from './icons/PlusIcon'
import { Colors, TextStyles, rem } from 'design-system'
import { UploadIcon } from './icons/UploadIcon'
import { CloseIcon } from './icons/CloseIcon'

interface Props {
  urls?: string[]
  onChagePhotos: (value: string[]) => void
}
export const UploadAndViewPhotos: React.FC<Props> = ({ urls, onChagePhotos }) => {
  const [photoURLs, setPhotoURLs] = useState<string[]>(urls ?? []) // This would be an array of photo URIs

  const addPhoto = (url: string) => {
    if (photoURLs.length < 10) {
      onChagePhotos([...photoURLs, url])
      setPhotoURLs([...photoURLs, url])
    } else {
      Alert.alert('Maximum photos reached', 'You can only upload up to 10 photos.')
    }
  }

  const removePhoto = (index: number) => {
    onChagePhotos(photoURLs.filter((_, i) => i !== index))
    setPhotoURLs(photoURLs.filter((_, i) => i !== index))
  }

  const handleUpload = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      quality: 1 as PhotoQuality,
    }

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else {
        addPhoto(response?.assets[0].uri ?? '')
      }
    })
  }

  const renderUploadButton = () => {
    return (
      <UploadButtonContainer onPress={handleUpload}>
        <PlusIcon />
      </UploadButtonContainer>
    )
  }

  const renderExtendedUploadButton = () => {
    return (
      <Container>
        <ExtendedButton onPress={handleUpload}>
          {renderUploadButton()}
          <HStack>
            <UploadIcon />
            <BodyM>Upload photo</BodyM>
          </HStack>
        </ExtendedButton>
      </Container>
    )
  }

  const render = () => {
    if (photoURLs.length === 0) {
      return renderExtendedUploadButton()
    } else {
      return (
        <PhotosContainer>
          {photoURLs.length === 0 && renderExtendedUploadButton()}
          {photoURLs.map((photoUri, index) => (
            <PhotoContainer key={photoUri + index}>
              <Photo source={{ uri: photoUri }} />
              <DeleteButton onPress={() => removePhoto(index)}>
                <CloseIcon />
              </DeleteButton>
            </PhotoContainer>
          ))}
          {photoURLs.length > 0 && photoURLs.length < 10 && renderUploadButton()}
        </PhotosContainer>
      )
    }
  }
  return render()
}

const ExtendedButton = styled.TouchableOpacity`
  align-items: center;
  gap: ${rem(15)}px;
`
const HStack = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${rem(10)}px;
`
const BodyM = styled(TextStyles.BodyM)``

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`

const PhotosContainer = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  gap: ${rem(16)}px;
`

const PhotoContainer = styled.View`
  position: relative;
  /* margin-right: 10px; */
`

const Photo = styled.Image`
  height: ${rem(80)}px;
  width: ${rem(80)}px;
  border-radius: ${rem(15)}px;
`

const DeleteButton = styled.TouchableOpacity`
  overflow: visible;
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: ${Colors.white};
  border-radius: ${rem(15)}px;
  padding: 5px;
`

const UploadButtonContainer = styled.TouchableOpacity`
  border-width: 1px;
  border-color: ${Colors.graySuperLight};
  border-radius: ${rem(15)}px;
  border-style: dashed;

  align-items: center;
  justify-content: center;
  height: ${rem(80)}px;
  width: ${rem(80)}px;
`
