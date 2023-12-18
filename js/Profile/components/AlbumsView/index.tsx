import { transformAlbums } from 'Profile/utils/transformExperiences'
import { TextStyles, rem } from 'design-system'
import React from 'react'
import { PointsList } from 'shared/PointsList'
import styled from 'styled-components/native'
import { Album, ModalType } from 'Profile/types'

interface Props {
  albums: Album[]
  didSelectItem: (type: ModalType, id: string) => void
  onAdd: (type: ModalType) => void
}

export const AlbumsView: React.FC<Props> = ({ didSelectItem, onAdd, albums }) => {
  return (
    <VStack>
      <Heading>Portfolio</Heading>
      <PointsList
        title={'Album'}
        points={transformAlbums(albums)}
        didSelectItem={(id) => didSelectItem(ModalType.albums, id)}
        onAdd={() => onAdd(ModalType.albums)}
      />
    </VStack>
  )
}

const VStack = styled.View`
  gap: ${rem(10)}px;
`
const Heading = styled(TextStyles.HeadingS)``
