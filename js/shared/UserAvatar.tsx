import React from 'react'
import { StyleProp, ViewProps, ViewStyle } from 'react-native'
import styled from 'styled-components/native'
import { TextStyles, rem, cfs } from 'design-system'

import FastImage from 'react-native-fast-image'

interface Props {
  image?: string
  name: string
  size?: number
}
//React.memo(
export const UserAvatar: React.FC<Props> = ({ image, name, size = rem(45) }) => {
  if (image) {
    console.log('🚀 ~ file: UserAvatar.tsx:19 ~ constUserAvatar:React.FC<Props>= ~ image:', image)
    return (
      <RoundedView size={size}>
        <RoundedFastImage size={size} source={{ uri: image }} />
      </RoundedView>
    )
  }
  return (
    <RoundedView size={size}>
      <StyledText size={size}>{renderFirstLetterOfNickname()}</StyledText>
    </RoundedView>
  )

  function renderFirstLetterOfNickname() {
    // const _name = name.trim().split(' ')[0] ?? ''
    // const symbols = [..._name]
    return 'A' //symbols[0]
  }
}

interface SizeProps {
  size: number
}

const RoundedFastImage = styled(FastImage)<{ size: number }>`
  height: ${(props: SizeProps) => props.size}px;
  aspect-ratio: 1;
  border-radius: ${(props: SizeProps) => props.size / 2}px;
`

const RoundedView = styled.View<{ size: number }>`
  height: ${(props) => props.size}px;
  aspect-ratio: 1;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: ${(props) => props.size / 2}px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`

const StyledText = styled.Text<{ size: number }>`
  color: white;
  font-weight: bold;
  font-size: ${(props) => cfs(props.size * 0.5)}px;
  ${TextStyles.MonoRegularFont}
  text-align: center;
`
