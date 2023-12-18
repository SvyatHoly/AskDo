import { transformExperiences, transformLocations } from 'Profile/utils/transformExperiences'
import { Colors, TextStyles, rem } from 'design-system'
import React from 'react'
import { PointsList } from 'shared/PointsList'
import styled from 'styled-components/native'
import { ModalType, Location } from 'Profile/types'
import { Switch } from 'shared/Switch'

interface Props {
  didSelectItem: (type: ModalType, id: string) => void
  onAdd: (type: ModalType) => void
  officeLocation: Location[]
  rideOutArea: Location[]
  isRemoteWork: boolean
  onRemoteWorkToggle: () => void
}

export const WorkAreaView: React.FC<Props> = ({
  didSelectItem,
  onAdd,
  officeLocation,
  rideOutArea,
  isRemoteWork,
  onRemoteWorkToggle,
}) => {
  return (
    <VStack>
      <Heading>Work area</Heading>
      <PointsList
        title={'My office'}
        points={transformLocations(officeLocation)}
        didSelectItem={(id) => didSelectItem(ModalType.office, id)}
        onAdd={() => onAdd(ModalType.office)}
      />
      <PointsList
        title={'Ride out area'}
        points={transformLocations(rideOutArea)}
        didSelectItem={(id) => didSelectItem(ModalType.rideOut, id)}
        onAdd={() => onAdd(ModalType.rideOut)}
      />
      <HStack>
        <Heading>Remote work</Heading>
        <Switch value={isRemoteWork} onValueChange={onRemoteWorkToggle} />
      </HStack>
    </VStack>
  )
}

const VStack = styled.View`
  gap: ${rem(10)}px;
`

const HStack = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${rem(20)}px;
  border-radius: ${rem(15)}px;
  background-color: ${Colors.grayButtonBackground};
  overflow: hidden;
  width: 100%;
`
const Heading = styled(TextStyles.HeadingS)``
