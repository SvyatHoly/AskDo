import React from 'react'
import styled from 'styled-components/native'
import { Colors, TextStyles, rem } from 'design-system'

export interface Props {
  value: number
  currency: string
  additionalInfo: string
}

export const Price: React.FC<Props> = ({ value, currency, additionalInfo }) => {
  return (
    <Bubble>
      <PriceTitle>{value + ' ' + currency + ' '}</PriceTitle>
      <Greaylabel>{additionalInfo}</Greaylabel>
    </Bubble>
  )
}

const PriceTitle = styled(TextStyles.TitleS)``

const Greaylabel = styled(TextStyles.BodyS)`
  color: ${Colors.greyInactive};
`

const Bubble = styled.View`
  align-self: flex-start;
  flex-direction: row;
  align-items: center;
  border-radius: ${rem(15)}px;
  background-color: ${Colors.greyButtonBackground};
  padding-left: ${rem(20)}px;
  padding-right: ${rem(20)}px;
  padding-top: ${rem(10)}px;
  padding-bottom: ${rem(10)}px;
`
