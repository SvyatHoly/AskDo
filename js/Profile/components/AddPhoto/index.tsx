import React from 'react'
import styled from 'styled-components/native'
import { ImagePlaceholder } from './ImagePlaceholder'
import { TextStyles, rem } from 'design-system'
import { PictureIcon } from 'shared/icons/PictureIcon'
import { UploadIcon } from 'shared/icons/UploadIcon'
import { TouchableOpacity } from 'react-native'

interface Props {
  photoUri?: string
}
export const AddPhoto: React.FC<Props> = ({ photoUri }) => {
  return (
    <HStack>
      <ImagePlaceholder uri={photoUri} />
      <VStack>
        <StyledOpacity>
          <InnerHStack>
            <UploadIcon />
            <Text>Upload photo</Text>
          </InnerHStack>
        </StyledOpacity>
        <StyledOpacity>
          <InnerHStack>
            <PictureIcon />
            <Text>Take a picture</Text>
          </InnerHStack>
        </StyledOpacity>
      </VStack>
    </HStack>
  )
}

const StyledOpacity = styled(TouchableOpacity)`
  height: ${rem(50)}px;
  align-items: center;
  justify-content: center;
`
const HStack = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: ${rem(20)}px;
`

const InnerHStack = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${rem(10)}px;
`

const Text = styled(TextStyles.BodyM)``

const VStack = styled.View`
  flex: 1;
  flex-direction: column;
`
