import React, { useRef, useState } from 'react'
import { EdgeInsets, SafeAreaInsetsContext } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { Colors, NavigationBar, TextStyles, rem } from 'design-system'
import { Description } from 'shared/Description'
import { ProfileCard } from '../components/ProfileCard'
import { useDispatch, useSelector } from 'react-redux'
import {
  profileSelector,
  setDescription,
  setWork,
  setEducation,
  setAchieves,
  deleteById,
  setOffice,
  setRideOut,
  setIsRemote,
  setServices,
  setAlbum,
} from '../reducers/ProfileDetails'
import { PopupPresenter, PopupType } from 'shared/PopupPresenter'
import { DescriptionModal } from '../components/modals/DescriptionModal'
import { ScrollView } from 'react-native'
import { ExperienceModal } from '../components/modals/ExperienceModal'
import { IntermediateModal } from '../components/modals/IntermediateModal'
import { LocationModal } from '../components/modals/LocationModal'

import { Album, Location, ModalType } from '../types'
import { ExperienceView } from '../components/ExperienceView'
import { WorkAreaView } from '../components/WorkArea'

import { Experience, ExperienceType, ServiceCategory } from 'Profile/types'
import { ServicesView } from 'Profile/components/Services'
import { ServiceModal } from 'Profile/components/modals/ServiceModal'
import { AlbumsModal } from 'Profile/components/modals/AlbumsModal'
import { AlbumsView } from 'Profile/components/AlbumsView'

interface Selected {
  type: ModalType
  value: ServiceCategory | Experience | Location | Album
}

export const ProfileScreen: React.FC = () => {
  const { description, work, education, achieves, office, rideOut, isWorkRemotely, services, albums } =
    useSelector(profileSelector)
  const [modalType, setModalType] = useState(ModalType.description)
  const [currentItemForEdit, setCurrentItemForEdit] = useState<Selected | null>(null)

  const ref = useRef(null)
  const dispatch = useDispatch()

  const openModal = (type: ModalType) => {
    setModalType(type)
    ref.current?.present()
  }

  const getModalComponent = () => {
    switch (modalType) {
      case ModalType.description:
        return DescriptionModal
      case ModalType.work:
        return ExperienceModal
      case ModalType.achieves:
        return ExperienceModal
      case ModalType.education:
        return ExperienceModal
      case ModalType.intermediate:
        return IntermediateModal
      case ModalType.office:
        return LocationModal
      case ModalType.rideOut:
        return LocationModal
      case ModalType.service:
        return ServiceModal
      case ModalType.albums:
        return AlbumsModal
      default:
        return ExperienceModal
    }
  }

  const handleDidSelectItem = (type: ModalType, id: string) => {
    const typeToExperienceMap: Record<ModalType, any[]> = {
      [ModalType.work]: work,
      [ModalType.education]: education,
      [ModalType.achieves]: achieves,
      [ModalType.office]: office,
      [ModalType.rideOut]: rideOut,
      [ModalType.service]: services,
      [ModalType.albums]: albums,
      [ModalType.description]: [],
      [ModalType.intermediate]: [],
    }

    const itemToEdit = typeToExperienceMap[type]?.find((el) => el.id === id)
    let current = { type: type, value: itemToEdit }

    setCurrentItemForEdit(current)
    openModal(ModalType.intermediate)
  }

  const onEdit = () => {
    ref.current?.close()

    setTimeout(() => {
      openModal(currentItemForEdit?.type)
    }, 500)
  }

  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <Page insets={insets}>
          <NavigationBar ignoreSafeArea={true} title="Profile" />
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: rem(150),
            }}>
            <ProfileCard
              name={'Mert Öztürk'}
              image={'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg'}
              ratinig={4.97}
              taskDone={7}
              feedbacks={28}
            />
            <Space />
            <VStack>
              <Heading>About me</Heading>
              <Description
                onPress={() => openModal(ModalType.description)}
                label={'Description'}
                value={description}
                placeholder={
                  'Introduce yourself for future clients. What’s your background and what can you do perfectly?'
                }
              />
            </VStack>
            <Space />
            <ExperienceView
              didSelectItem={handleDidSelectItem}
              onAdd={openModal}
              work={work}
              education={education}
              achieves={achieves}
            />
            <Space />

            <WorkAreaView
              didSelectItem={handleDidSelectItem}
              onAdd={openModal}
              officeLocation={office}
              rideOutArea={rideOut}
              isRemoteWork={isWorkRemotely}
              onRemoteWorkToggle={() => dispatch(setIsRemote(!isWorkRemotely))}
            />
            <Space />

            <ServicesView didSelectItem={handleDidSelectItem} onAdd={openModal} services={services} />
            <Space />

            <AlbumsView didSelectItem={handleDidSelectItem} onAdd={openModal} albums={albums} />
          </ScrollView>
          <PopupPresenter
            ref={ref}
            type={PopupType.bottom}
            component={getModalComponent()}
            forwardProps={getForwardProps()}
          />
        </Page>
      )}
    </SafeAreaInsetsContext.Consumer>
  )

  function getForwardProps() {
    switch (modalType) {
      case ModalType.description:
        return {
          label: 'Description',
          text: description,
          onSave: (value: string) => {
            dispatch(setDescription(value))
            setCurrentItemForEdit(null)
            ref.current?.close()
          },
          onClose: () => {
            setCurrentItemForEdit(null)
            ref.current?.close()
          },
        }
      case ModalType.work:
        return {
          label: 'Experience',
          type: ExperienceType.work,
          data: currentItemForEdit?.value,
          onSave: (value: Experience) => {
            setCurrentItemForEdit(null)
            dispatch(setWork(value))
            ref.current?.close()
          },
          onClose: () => {
            setCurrentItemForEdit(null)
            ref.current?.close()
          },
        }
      case ModalType.education:
        return {
          label: 'Education',
          type: ExperienceType.education,
          data: currentItemForEdit?.value,
          onSave: (value: Experience) => {
            setCurrentItemForEdit(null)
            dispatch(setEducation(value))
            ref.current?.close()
          },
          onClose: () => {
            setCurrentItemForEdit(null)
            ref.current?.close()
          },
        }
      case ModalType.achieves:
        return {
          label: 'Achieves, certification',
          type: ExperienceType.certfication,
          data: currentItemForEdit?.value,
          onSave: (value: Experience) => {
            setCurrentItemForEdit(null)
            dispatch(setAchieves(value))
            ref.current?.close()
          },
          onClose: () => {
            setCurrentItemForEdit(null)
            ref.current?.close()
          },
        }
      case ModalType.intermediate:
        return {
          label: 'Achieves, certification',
          onEdit: onEdit,
          onDelete: () => {
            dispatch(deleteById(currentItemForEdit?.value.id ?? ''))

            setCurrentItemForEdit(null)
            ref.current?.close()
          },
          onClose: () => {
            setCurrentItemForEdit(null)
            ref.current?.close()
          },
        }
      case ModalType.rideOut:
        return {
          location: currentItemForEdit?.value,
          onSave: (value: Location) => {
            setCurrentItemForEdit(null)
            dispatch(setRideOut(value))
            ref.current?.close()
          },
          onClose: () => {
            setCurrentItemForEdit(null)
            ref.current?.close()
          },
        }
      case ModalType.office:
        return {
          location: currentItemForEdit?.value,
          onSave: (value: Location) => {
            setCurrentItemForEdit(null)
            dispatch(setOffice(value))
            ref.current?.close()
          },
          onClose: () => {
            setCurrentItemForEdit(null)
            ref.current?.close()
          },
        }
      case ModalType.service:
        return {
          service: currentItemForEdit?.value,
          onSave: (value: ServiceCategory) => {
            setCurrentItemForEdit(null)
            dispatch(setServices(value))
            ref.current?.close()
          },
          onClose: () => {
            setCurrentItemForEdit(null)
            ref.current?.close()
          },
        }
      case ModalType.albums:
        return {
          album: currentItemForEdit?.value,
          services: services,
          onSave: (value: Album) => {
            setCurrentItemForEdit(null)
            dispatch(setAlbum(value))
            ref.current?.close()
          },
          onClose: () => {
            setCurrentItemForEdit(null)
            ref.current?.close()
          },
        }
    }
  }
}

const VStack = styled.View`
  gap: ${rem(10)}px;
`
const Heading = styled(TextStyles.HeadingS)``

const Space = styled.View`
  height: ${rem(25)}px;
`

const Page = styled.View<{ insets: EdgeInsets | null }>`
  flex: 1;
  width: 100%;
  margin-top: ${(props) => props.insets?.top ?? 0}px;
  padding: ${rem(12)}px;
  background-color: ${Colors.white};
`
