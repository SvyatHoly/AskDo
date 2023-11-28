import React from 'react'
import styled from 'styled-components/native'
import { Colors, TextStyles, rem } from 'design-system'
import { StarsIcon } from 'shared/icons/StarsIcon'

export const NoFeedbackCard: React.FC = () => {
  return (
    <VStack>
      <StarsIcon />
      <GrayText>Performer doesn’t have feedbacks</GrayText>
    </VStack>
  )
}

const VStack = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${rem(147)}px;
  border-radius: ${rem(15)}px;
  background-color: ${Colors.greyButtonBackground};
`

const GrayText = styled(TextStyles.BodyM)`
  color: ${Colors.greyInactive};
`
