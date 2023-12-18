import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { TextStyles, Colors, rem } from 'design-system'
import { PencilIcon } from 'shared/icons/PencilIcon'
import { PlusIcon } from 'shared/icons/PlusIcon'
import { TouchableOpacity } from 'react-native'

interface Props {
  label: string
  placeholder: string
  value?: string
  onPress: () => void
}

export const Description: React.FC<Props> = ({ label, value, placeholder, onPress }) => {
  const [isLess, setIsLess] = useState(true)
  const [showButton, setShowButton] = useState(false)
  const [width, setWidth] = useState(1)

  useEffect(() => {
    if (value && value.length !== 0) {
      estimateLineCount(value, width)
    }
  }, [value, width])

  const handleLayout = ({ nativeEvent }: any) => setWidth(nativeEvent.layout.width)

  function estimateLineCount(text: string, width: number) {
    const averageCharacterWidth = rem(7)

    // Calculate the estimated number of characters per line
    let charactersPerLine = Math.floor(width / averageCharacterWidth)
    if (charactersPerLine === 0) {
      charactersPerLine = 1
    }

    // Split the text into lines based on the estimated characters per line
    const lines = text.match(new RegExp(`.{1,${charactersPerLine}}`, 'g')) || []

    setShowButton(lines.length > 2)
  }

  const renderButtonText = (isLess: boolean) => {
    return isLess ? 'Show more' : 'Show less'
  }

  return (
    <VStack onLayout={handleLayout}>
      <HStack>
        <Label>{label}</Label>
        <IconContainer onPress={onPress}>{!value ? <PlusIcon /> : <PencilIcon />}</IconContainer>
      </HStack>
      {value && <Text numberOfLines={isLess ? 2 : 0}>{value}</Text>}
      {!value && <GrayText>{placeholder}</GrayText>}
      {showButton && (
        <ButtonContainer onPress={() => setIsLess(!isLess)}>
          <GrayText>{renderButtonText(isLess)}</GrayText>
        </ButtonContainer>
      )}
    </VStack>
  )
}

const VStack = styled.View`
  flex-direction: column;
  background-color: ${Colors.grayButtonBackground};
  border-radius: ${rem(15)}px;
  padding: ${rem(20)}px;
  gap: ${rem(10)}px;
`

const IconContainer = styled(TouchableOpacity).attrs({
  hitSlop: { top: rem(12), right: rem(12), bottom: rem(12), left: rem(12) },
})``

const ButtonContainer = styled(TouchableOpacity).attrs({
  hitSlop: { top: rem(12), right: rem(12), bottom: rem(12), left: rem(12) },
})`
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
`
const HStack = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const GrayText = styled(TextStyles.BodyM)`
  color: ${Colors.grayInactive};
`
const Text = styled(TextStyles.BodyM)``

const Label = styled(TextStyles.LabelL)``
