import React from 'react'
import styled from 'styled-components/native'
import { TextStyles, Colors, rem } from 'design-system'
import { StarIcon } from 'shared/icons/StarIcon'

export enum Type {
  raiting,
  taskDone,
  feedbacks,
}
interface Props {
  type: Type
  value: number
}
export const UserRegalia: React.FC<Props> = ({ type, value }) => {
  const renderText = (type: Type) => {
    switch (type) {
      case Type.raiting:
        return 'Rate'
      case Type.feedbacks:
        return 'Feedbacks'
      case Type.taskDone:
        return 'Task done'
    }
  }
  return (
    <VStack>
      <HStack>
        <Label>{value}</Label>
        {type === Type.raiting && <StarIcon />}
      </HStack>
      <Description>{renderText(type)}</Description>
    </VStack>
  )
}

const VStack = styled.View`
  flex-direction: column;
  align-items: center;
`
const HStack = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${rem(5)}px;
`

const Label = styled(TextStyles.LabelL)``

const Description = styled(TextStyles.BodyM)`
  color: ${Colors.grayInactive};
`
