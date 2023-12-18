import { transformServices } from 'Profile/utils/transformExperiences'
import { TextStyles, rem } from 'design-system'
import React from 'react'
import { PointsList } from 'shared/PointsList'
import styled from 'styled-components/native'
import { ModalType, ServiceCategory } from 'Profile/types'

interface Props {
  didSelectItem: (type: ModalType, id: string) => void
  onAdd: (type: ModalType) => void
  services: ServiceCategory[]
}

export const ServicesView: React.FC<Props> = ({ didSelectItem, onAdd, services }) => {
  return (
    <VStack>
      <Heading>Services</Heading>
      <PointsList
        title={'Services provided'}
        points={transformServices(services)}
        didSelectItem={(id) => didSelectItem(ModalType.service, id)}
        onAdd={() => onAdd(ModalType.service)}
      />
    </VStack>
  )
}

const VStack = styled.View`
  gap: ${rem(10)}px;
`
const Heading = styled(TextStyles.HeadingS)``
