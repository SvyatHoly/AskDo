import React from 'react'
import styled from 'styled-components/native'
import { TextStyles, rem } from 'design-system'
import { NoFeedbackCard } from './NoFeedbackCard'

export const Feedback: React.FC = () => {
  return (
    <Container>
      <Label>Feedbacks</Label>
      <NoFeedbackCard />
    </Container>
  )
}

const Container = styled.View`
  padding: ${rem(14)}px;
`
const Label = styled(TextStyles.LabelL)`
  margin-bottom: ${rem(5)}px;
`
