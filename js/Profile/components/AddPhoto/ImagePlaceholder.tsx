import { Colors, rem } from 'design-system'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import { CameraIcon } from 'shared/icons/CameraIcon'
import styled from 'styled-components/native'

interface Props {
  uri?: string
}
export const ImagePlaceholder: React.FC<Props> = ({ uri }) => {
  return (
    <RoundedView>
      {uri && <RoundedFastImage source={{ uri }} />}
      {!uri && <CameraIcon />}
    </RoundedView>
  )
}

const RoundedFastImage = styled(FastImage)`
  height: ${rem(98)}px;
  aspect-ratio: 1;
  border-radius: ${rem(15)}px;
`
const IconRoundContainer = styled.View<{ size: number }>`
  position: absolute;
  /* height: ${(props: SizeProps) => props.size * 0.33}px; */
  aspect-ratio: 1;
  justify-content: center;
  align-items: center;
  right: 0px;
  bottom: 0px;
  border-radius: ${rem(15)}px;
  background-color: ${Colors.grayForInput};
`
const RoundedView = styled(TouchableOpacity)`
  height: ${rem(100)}px;
  aspect-ratio: 1;
  background-color: ${Colors.white};
  border-radius: ${rem(15)}px;
  border-style: dashed;
  border-color: #d8d8d8;
  border-width: 1px;
  /* overflow: hidden; */
  align-items: center;
  justify-content: center;
`
