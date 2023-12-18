import { transformExperiences } from 'Profile/utils/transformExperiences'
import { TextStyles, rem } from 'design-system'
import React from 'react'
import { PointsList } from 'shared/PointsList'
import styled from 'styled-components/native'
import { ModalType, Experience } from 'Profile/types'

interface Props {
  didSelectItem: (type: ModalType, id: string) => void
  onAdd: (type: ModalType) => void
  work: Experience[]
  education: Experience[]
  achieves: Experience[]
}
export const ExperienceView: React.FC<Props> = ({ didSelectItem, onAdd, work, education, achieves }) => {
  return (
    <VStack>
      <Heading>Experience & Education</Heading>
      <PointsList
        title={'Experience'}
        points={transformExperiences(work)}
        didSelectItem={(id) => didSelectItem(ModalType.work, id)}
        onAdd={() => onAdd(ModalType.work)}
      />
      <PointsList
        title={'Education'}
        points={transformExperiences(education)}
        didSelectItem={(id) => didSelectItem(ModalType.education, id)}
        onAdd={() => onAdd(ModalType.education)}
      />
      <PointsList
        title={'Achieves, certification'}
        points={transformExperiences(achieves)}
        didSelectItem={(id) => didSelectItem(ModalType.achieves, id)}
        onAdd={() => onAdd(ModalType.achieves)}
      />
    </VStack>
  )
}

const VStack = styled.View`
  gap: ${rem(10)}px;
`
const Heading = styled(TextStyles.HeadingS)``
