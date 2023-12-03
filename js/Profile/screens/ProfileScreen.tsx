import React, { useRef, useState } from 'react'
import { EdgeInsets, SafeAreaInsetsContext } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { Colors, NavigationBar, TextStyles, rem } from 'design-system'
import { Description } from 'shared/Description'
import { ProfileCard } from '../components/ProfileCard'
import { useDispatch, useSelector } from 'react-redux'
import { profileSelector, setDescription, setWork, setEducation, setAchieves, deleteById } from '../reducers'
import { PopupPresenter, PopupType } from 'shared/PopupPresenter'
import { DescriptionModal } from '../components/modals/DescriptionModal'
import { PointsList } from 'shared/PointsList'
import { ScrollView } from 'react-native'
import { ExperienceModal } from '../components/modals/ExperienceModal'
import { IntermediateModal } from '../components/modals/IntermediateModal'

import { transformExperiences } from 'Profile/utils/transformExperiences'
import { Experience, ExperienceType } from 'Profile/types'

enum ModalType {
  description,
  work,
  education,
  achieves,
  intermediate,
}

export const ProfileScreen: React.FC = () => {
  const { description, work, education, achieves } = useSelector(profileSelector)
  const [modalType, setModalType] = useState(ModalType.description)
  const [currentExperience, setCurrentExperience] = useState<Experience | null | undefined>(null)

  const ref = useRef(null)
  const dispatch = useDispatch()

  const openModal = (type: ModalType) => {
    console.log(' openModal ~ type:', type)
    console.log(' currentExperience:', currentExperience)

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
      default:
        return ExperienceModal
    }
  }

  const handleDidSelectItem = (type: ModalType, id: string) => {
    let itemToEdit
    switch (type) {
      case ModalType.work:
        itemToEdit = work.find((el) => el.id === id)
        break
      case ModalType.education:
        itemToEdit = education.find((el) => el.id === id)
        break
      case ModalType.achieves:
        itemToEdit = achieves.find((el) => el.id === id)
        break
      default:
        // Handle other cases or provide a default value
        break
    }

    setCurrentExperience(itemToEdit)
    openModal(ModalType.intermediate)
  }

  const onEdit = () => {
    ref.current?.close()

    switch (currentExperience?.type) {
      case ExperienceType.work:
        setTimeout(() => {
          openModal(ModalType.work)
        }, 500)
        break
      case ExperienceType.education:
        setTimeout(() => {
          openModal(ModalType.education)
        }, 500)
        break
      case ExperienceType.certfication:
        setTimeout(() => {
          openModal(ModalType.achieves)
        }, 500)
        break
    }
  }

  const getForwardProps = () => {
    switch (modalType) {
      case ModalType.description:
        return {
          label: 'Description',
          text: description,
          onSave: (value: string) => {
            dispatch(setDescription(value))
            setCurrentExperience(null)
            ref.current?.close()
          },
          onClose: () => {
            setCurrentExperience(null)
            ref.current?.close()
          },
        }
      case ModalType.work:
        return {
          label: 'Experience',
          type: ExperienceType.work,
          data: currentExperience,
          onSave: (value: Experience) => {
            setCurrentExperience(null)
            dispatch(setWork(value))
            ref.current?.close()
          },
          onClose: () => {
            setCurrentExperience(null)
            ref.current?.close()
          },
        }
      case ModalType.education:
        return {
          label: 'Education',
          type: ExperienceType.education,
          data: currentExperience,
          onSave: (value: Experience) => {
            setCurrentExperience(null)
            dispatch(setEducation(value))
            ref.current?.close()
          },
          onClose: () => {
            setCurrentExperience(null)
            ref.current?.close()
          },
        }
      case ModalType.achieves:
        return {
          label: 'Achieves, certification',
          type: ExperienceType.certfication,
          data: currentExperience,
          onSave: (value: Experience) => {
            setCurrentExperience(null)
            dispatch(setAchieves(value))
            ref.current?.close()
          },
          onClose: () => {
            setCurrentExperience(null)
            ref.current?.close()
          },
        }
      case ModalType.intermediate:
        return {
          label: 'Achieves, certification',
          onEdit: onEdit,
          onDelete: () => {
            dispatch(deleteById(currentExperience?.id ?? ''))

            setCurrentExperience(null)
            ref.current?.close()
          },
          onClose: () => {
            setCurrentExperience(null)
            ref.current?.close()
          },
        }
    }
    return currentExperience
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
            <VStack>
              <Heading>Experience & Education</Heading>
              <PointsList
                title={'Experience'}
                points={transformExperiences(work)}
                didSelectItem={(id) => handleDidSelectItem(ModalType.work, id)}
                onAdd={() => openModal(ModalType.work)}
              />
              <PointsList
                title={'Education'}
                points={transformExperiences(education)}
                didSelectItem={(id) => handleDidSelectItem(ModalType.education, id)}
                onAdd={() => openModal(ModalType.education)}
              />
              <PointsList
                title={'Achieves, certification'}
                points={transformExperiences(achieves)}
                didSelectItem={(id) => handleDidSelectItem(ModalType.achieves, id)}
                onAdd={() => openModal(ModalType.achieves)}
              />
            </VStack>
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
