import React from 'react'
import styled from 'styled-components/native'
import { Colors, TextStyles, rem } from 'design-system'
import { HandGestureIcon } from 'shared/icons/HandGestureIcon'
import { EyeIcon } from 'shared/icons/EyeIcon'
import moment from 'moment'
import { Trait, TraitType } from 'Tasks/types'

export interface Props {
  traits: Trait[]
}

export const TraitsContainer: React.FC<Props> = ({ traits }) => {
  const renderPrice = (trait: Trait) => {
    return (
      <Bubble>
        <PriceTitle>{trait.value + ' ' + trait.currency + ' '}</PriceTitle>
        <Greaylabel>{trait.additionalInfo}</Greaylabel>
      </Bubble>
    )
  }

  const renderCreated = (trait: Trait) => {
    return (
      <Bubble>
        <Greaylabel>{`Created ${moment(trait.value * 1000).fromNow()}`}</Greaylabel>
      </Bubble>
    )
  }

  const renderResponded = (trait: Trait) => {
    return (
      <Bubble>
        <HandGestureIcon />
        <Greaylabel>{`${trait.value} responds`}</Greaylabel>
      </Bubble>
    )
  }

  const renderViews = (trait: Trait) => {
    return (
      <Bubble>
        <EyeIcon />
        <Greaylabel>{`${trait.value} views`}</Greaylabel>
      </Bubble>
    )
  }

  const renderStatus = (trait: Trait) => {
    return (
      <Bubble>
        <Greenlabel>{trait.value === 1 ? 'Open' : 'Closed'}</Greenlabel>
      </Bubble>
    )
  }
  const renderBubbles = () => {
    return traits.map((el) => {
      switch (el.type) {
        case TraitType.PRICE:
          return renderPrice(el)
        case TraitType.CREATED:
          return renderCreated(el)
        case TraitType.RESPONDED:
          return renderResponded(el)
        case TraitType.VIEWS:
          return renderViews(el)
        case TraitType.STATUS:
          return renderStatus(el)
      }
    })
  }
  return <Container>{renderBubbles()}</Container>
}

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: ${rem(10)}px;
`

const PriceTitle = styled(TextStyles.TitleS)``

const Greaylabel = styled(TextStyles.BodyS)`
  color: ${Colors.grayInactive};
`

const Greenlabel = styled(TextStyles.BodyS)`
  color: ${Colors.normalGreen};
`

const Bubble = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: ${rem(15)}px;
  background-color: ${Colors.greyButtonBackground};
  padding-left: ${rem(10)}px;
  padding-right: ${rem(10)}px;
  padding-top: ${rem(5)}px;
  padding-bottom: ${rem(5)}px;
  gap: ${rem(5)}px;
`
