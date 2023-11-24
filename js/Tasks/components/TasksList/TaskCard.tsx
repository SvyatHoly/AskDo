import styled from 'styled-components/native'
import React from 'react'
import { Colors, TextStyles, rem } from 'design-system'
import moment from 'moment'
import { LocationIcon } from 'shared/icons/LocationIcon'
import { TimeHistoryIcon } from 'shared/icons/TimeHistoryIcon'
import { ServiceIcon } from 'shared/icons/ServiceIcon'

interface TaskCardModel {
  type: string
  price: number
  currency: string
  desciption: string
  startDate: number
  traits: string[]
  location: string
  postDate: number
}
interface Props {}

export const TaskCard: React.FC<Props> = () => {
  const model: TaskCardModel = {
    type: 'Installation',
    price: 123,
    currency: 'USD',
    desciption: 'House keeper with cooking skills',
    startDate: 1700842610,
    traits: [
      'one',
      'two',
      'three',
      'Full clearing',
      'house size: 900 m2',
      'daily clearing',
      'floors: 3',
      'Privet house',
      '1 time per 2 days',
      'looking for a housekeeper on a permanent basis who will be able to manage his problems',
    ],
    location: 'Istanbul, Yalnız Selvi Cd. 6D1',
    postDate: 1700838000,
  }

  return (
    <Container>
      <HStack>
        <ColorStrip>
          <ServiceIcon />
        </ColorStrip>
        <VStack>
          <HStack>
            <TypeLabel>{model.type}</TypeLabel>
            <PriceLabel>{model.price + model.currency}</PriceLabel>
          </HStack>
          <DesctiptionLabel>{model.desciption}</DesctiptionLabel>
          <StartDateLabel>Start from {moment.unix(model.startDate).format('DD MMMM')}</StartDateLabel>
          <Text>{model.traits.join(' • ')}</Text>
          <LocationAndTimeContainer>
            <HStack>
              <LocationIcon />
              <LocationLabel>{model.location}</LocationLabel>
            </HStack>
            <HStack>
              <TimeHistoryIcon />
              <LocationLabel>{moment(model.postDate * 1000).fromNow()}</LocationLabel>
            </HStack>
          </LocationAndTimeContainer>
        </VStack>
      </HStack>
    </Container>
  )
}

const LocationAndTimeContainer = styled.View`
  flex-direction: column;
  /* justify-content: space-between; */
  /* flex: 1; */
  /* padding: ${rem(12)}px; */
  /* height: 100%; */
  gap: ${rem(5)}px;
`
const Text = styled(TextStyles.CalloutM).attrs({
  numberOfLines: 3,
})`
  word-wrap: break-word;
  text-overflow: ellipsis;
`

const LocationLabel = styled(TextStyles.BodyS)`
  text-overflow: ellipsis;
  color: ${Colors.greyInactive};
  flex: 1;
  margin-left: ${rem(10)}px;
`

const DesctiptionLabel = styled(TextStyles.TitleS)``
const PriceLabel = styled(TextStyles.TitleS)``
const TypeLabel = styled(TextStyles.BodyS)``
const StartDateLabel = styled(TextStyles.BodyS)``

const HStack = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  height: 100%;
`

const VStack = styled.View`
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  padding: ${rem(12)}px;
  height: 100%;
  gap: ${rem(10)}px;
`
const Container = styled.View`
  background-color: ${Colors.white};
  margin-top: ${rem(18)}px;
  margin-left: ${rem(20)}px;
  margin-right: ${rem(20)}px;
  border-radius: ${rem(15)}px;
  box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.1);
`

const ColorStrip = styled.View`
  align-content: center;
  justify-content: center;
  border-top-left-radius: ${rem(15)}px;
  border-bottom-left-radius: ${rem(15)}px;
  background-color: ${Colors.normalOrange};
  height: 100%;
  width: ${rem(30)}px;
`
