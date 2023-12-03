import React from 'react'
import { EdgeInsets, SafeAreaInsetsContext } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { Colors, LeftButtonType, NavigationBar, TextStyles, rem } from 'design-system'
import { Navigation } from 'navigation'
import { TaskCardModel, Trait, TraitType } from 'Tasks/types'
import { TraitsContainer } from './TraitsContainer'
import { Price } from './Price'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { LocationIcon } from 'shared/icons/LocationIcon'
import moment from 'moment'
export interface Props {
  location: string
  startDate: number
  finishDate: number
  locationDescription: string
  taskInfo: string
}

export const Details: React.FC<Props> = ({ location, startDate, finishDate, locationDescription, taskInfo }) => {
  return (
    <VStack>
      <MapContainer>
        <StyledMapView />
      </MapContainer>
      <HStack>
        <LocationIcon color={Colors.normalBlue} />
        <LocationLabel>{location}</LocationLabel>
      </HStack>
      <MiniVStack>
        <GrayLabel>Start:</GrayLabel>
        <BlackLabel>{moment.unix(startDate).format('Do MMMM YYYY, HH:mm')}</BlackLabel>
      </MiniVStack>
      <Separator />
      <MiniVStack>
        <GrayLabel>Finish:</GrayLabel>
        <BlackLabel>{moment.unix(finishDate).format('Do MMMM YYYY, HH:mm')}</BlackLabel>
      </MiniVStack>
      <Separator />
      <MiniVStack>
        <GrayLabel>Where:</GrayLabel>
        <BlackLabel>{locationDescription}</BlackLabel>
      </MiniVStack>
      <Separator />
      <MiniVStack>
        <GrayLabel>Need to do:</GrayLabel>
        <BlackLabel>{taskInfo}</BlackLabel>
      </MiniVStack>
    </VStack>
  )
}

const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${Colors.greySuperLight};
`

const HStack = styled.View`
  flex-direction: row;
`

const MapContainer = styled.View`
  height: ${rem(150)}px;
  width: 100%;
  border-radius: ${rem(15)}px;
  overflow: hidden;
`
const StyledMapView = styled(MapView)`
  height: 100%;
  width: 100%;
`
const VStack = styled.View`
  flex-direction: column;
  padding: ${rem(20)}px;
  border-radius: ${rem(15)}px;
  background-color: ${Colors.white};
  box-shadow: 0px 0px 17px rgba(0, 0, 0, 0.05);
  gap: ${rem(10)}px;
`
const LocationLabel = styled(TextStyles.BodyM)`
  color: ${Colors.grayInactive};
  margin-left: ${rem(10)}px;
`

const GrayLabel = styled(TextStyles.LabelM)`
  color: ${Colors.grayInactive};
`

const BlackLabel = styled(TextStyles.BodyM)`
  color: ${Colors.darkText2};
`

const MiniVStack = styled.View`
  flex-direction: column;
  align-content: flex-start;
  gap: ${rem(7)}px;
`
