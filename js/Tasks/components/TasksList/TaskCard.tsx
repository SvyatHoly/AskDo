import styled from 'styled-components/native'
import React from 'react'
import { Colors, TextStyles, rem } from 'design-system'
import moment from 'moment'
import { LocationIcon } from 'shared/icons/LocationIcon'
import { TimeHistoryIcon } from 'shared/icons/TimeHistoryIcon'
import { ServiceIcon } from 'shared/icons/ServiceIcon'
import { TouchableOpacity } from 'react-native'
import { TaskCardModel } from 'Tasks/types'
interface Props {
  onPress: (id: string) => void
}

export const TaskCard: React.FC<Props> = ({ onPress }) => {
  const model: TaskCardModel = {
    id: '1',
    type: 'Installation',
    price: 123,
    currency: 'USD',
    description: 'House keeper with cooking skills',
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
    <Container onPress={() => onPress(model.id)}>
      <HStack>
        <ColorStrip>
          <ServiceIcon />
        </ColorStrip>
        <VStack>
          <HStack>
            <TypeLabel>{model.type}</TypeLabel>
            <PriceLabel>{model.price + model.currency}</PriceLabel>
          </HStack>
          <DesctiptionLabel>{model.description}</DesctiptionLabel>
          <StartDateLabel>Start from {moment.unix(model.startDate).format('DD MMMM')}</StartDateLabel>
          <Text>{model.traits.join(' • ')}</Text>
          <LocationAndTimeContainer>
            <HStack>
              <LocationIcon color="#9B9B9B" />
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
  gap: ${rem(5)}px;
`
const Text = styled(TextStyles.CalloutM).attrs({
  numberOfLines: 3,
})``

const LocationLabel = styled(TextStyles.BodyS)`
  color: ${Colors.grayInactive};
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
const Container = styled(TouchableOpacity)`
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
