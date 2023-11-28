import React from 'react'
import styled from 'styled-components/native'
import { UserAvatar } from 'shared/UserAvatar'
import { Colors, TextStyles, rem } from 'design-system'
import { OnlineStatus } from 'shared/OnlineStatus'
import moment from 'moment'

interface Props {
  image: string
  name: string
  lastVisit: number
  since: number
  isConfirmed: boolean
}
export const Header: React.FC<Props> = ({ image, name, lastVisit, isConfirmed }) => {
  return (
    <Container>
      <VStack gap={rem(20)}>
        <HStack gap={rem(14)}>
          <UserAvatar image={image} name={name} size={rem(60)} />
          <VStack gap={0}>
            <Heading>{name}</Heading>
            <OnlineStatus lastVisit={lastVisit} />
          </VStack>
        </HStack>
        <VStack gap={rem(10)}>
          <HStack gap={rem(5)}>
            <GrayText>In Ask Do since:</GrayText>
            <BlackText>{moment.unix(lastVisit).format('DD MMMM yyyy')}</BlackText>
          </HStack>
          <HStack gap={rem(5)}>
            <GrayText>Phone number:</GrayText>
            <BlackText>{isConfirmed ? 'confirmed' : 'not confirmed'}</BlackText>
          </HStack>
        </VStack>
      </VStack>
    </Container>
  )
}

const Container = styled.View`
  padding: ${rem(14)}px;
`
const Heading = styled(TextStyles.HeadingM)``
const VStack = styled.View<{ gap: number }>`
  flex-direction: collumn;
  gap: ${(props) => rem(props.gap)}px;
`

const HStack = styled.View<{ gap: number }>`
  flex-direction: row;
  align-items: center;
  gap: ${(props) => rem(props.gap)}px;
`

const GrayText = styled(TextStyles.BodyM)`
  color: ${Colors.greyInactive};
`
const BlackText = styled(TextStyles.BodyM)`
  color: ${Colors.darkText};
`
