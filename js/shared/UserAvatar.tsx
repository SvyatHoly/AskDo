import React from 'react'
import { StyleProp, TouchableOpacity, ViewProps, ViewStyle } from 'react-native'
import styled from 'styled-components/native'
import { TextStyles, rem, cfs, Colors } from 'design-system'
import { PencilIcon } from 'shared/icons/PencilIcon'
import FastImage from 'react-native-fast-image'

interface Props {
  image?: string
  name: string
  size?: number
  onPress?: () => void
}
//React.memo(
export const UserAvatar: React.FC<Props> = ({ image, name, size = rem(45), onPress }) => {
  return (
    <>
      <RoundedView size={size} activeOpacity={onPress ? 0.2 : 1} onPress={onPress}>
        {image ? (
          <RoundedFastImage size={size} source={{ uri: image }} />
        ) : (
          <StyledText size={size}>{renderFirstLetterOfNickname()}</StyledText>
        )}
        {onPress && (
          <IconRoundContainer size={size}>
            <PencilIcon size={rem(10)} />
          </IconRoundContainer>
        )}
      </RoundedView>
    </>
  )

  function renderFirstLetterOfNickname() {
    const _name = name.trim().split(' ')[0] ?? ''
    const symbols = [..._name]
    return symbols[0]
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
const IconRoundContainer = styled.View<{ size: number }>`
  position: absolute;
  height: ${(props: SizeProps) => props.size * 0.33}px;
  aspect-ratio: 1;
  justify-content: center;
  align-items: center;
  right: 0px;
  bottom: 0px;
  border-radius: ${(props: SizeProps) => (props.size * 0.33) / 2}px;
  background-color: ${Colors.normalBlue};
`
const RoundedView = styled(TouchableOpacity)<{ size: number }>`
  height: ${(props) => props.size}px;
  aspect-ratio: 1;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: ${(props) => props.size / 2}px;
  /* overflow: hidden; */
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
