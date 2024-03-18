import React, { useEffect, useState } from 'react'
import { EdgeInsets, SafeAreaInsetsContext } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import {
  TextStyles,
  rem,
  Colors,
  Button,
  NavigationBar,
  LeftButtonType,
  RightButtonType,
  ButtonColor,
} from 'design-system'
import { BubblePicker, Item } from 'shared/BubblePicker'
import { servicesSelector } from 'Profile/reducers/Services'
import { useSelector } from 'react-redux'
import { transformServices } from 'Profile/utils/transformExperiences'
import { ServiceCategory } from 'Profile/types'

interface Props {
  service?: ServiceCategory
  onClose: () => void
  onSave: (value: ServiceCategory) => void
}

enum State {
  first,
  second,
}

export const ServiceModal: React.FC<Props> = ({ onClose, onSave, service }) => {
  const { services: allServices } = useSelector(servicesSelector)

  const [state, setState] = useState(service ? State.second : State.first)
  const [items, setItems] = useState<Item[]>([])
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>(service?.id)

  useEffect(() => {
    let items = []
    if (state === State.first) {
      items = transformServices(allServices)
    } else {
      const selected = allServices.find((el) => el.id === (service?.id ?? selectedItemId))
      items = mergeAndDeduplicateArrays(selected?.subcategories ?? [], service?.subcategories ?? [])
    }
    setItems(items)
  }, [state, allServices, service])

  const handleSelect = (id: string) => {
    if (state === State.first) {
      const item = allServices.find((el) => el.id === id)
      if (item) {
        setSelectedItemId(item.id)
      }
      setState(State.second)
    } else {
      const index = items.findIndex((el) => el.id === id)

      if (index !== -1) {
        setItems((prevItems) => {
          const itemsCopy = [...prevItems]
          const obj = itemsCopy[index]

          if (obj) {
            obj.isSelected = !obj.isSelected
            itemsCopy[index] = obj
          }

          return itemsCopy
        })
      }
    }
  }

  const handleSave = () => {
    let servObj = { ...allServices.find((el) => el.id === selectedItemId) }
    if (servObj) {
      servObj.subcategories = items
        .filter((el) => el.isSelected)
        .map((el) => {
          return { id: el.id, name: el.name }
        })
      onSave(servObj)
    }
  }

  const handleBack = () => {
    setSelectedItemId(undefined)
    setState(State.first)
  }

  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <>
          <Page insets={insets}>
            <NavigationBar
              ignoreSafeArea={true}
              leftButtonType={
                service ? LeftButtonType.NONE : state === State.first ? LeftButtonType.NONE : LeftButtonType.BACK
              }
              onLeftButtonPress={handleBack}
              rightButtonType={RightButtonType.CROSS}
              onRightButtonPress={onClose}
              title="Choose specialization"
            />
            <Separator />
            <VStack>
              <Container>
                {state === State.second && (
                  <>
                    <LabelM>Chosen specialization: {allServices.find((el) => el.id === selectedItemId)?.name}</LabelM>
                    <BodyM>
                      Choose a subcategory of your specialization in which you understand and are ready to provide your
                      services.
                    </BodyM>
                  </>
                )}

                <BubblePicker items={items} isSelectionAllowed={state === State.second} onSelect={handleSelect} />
              </Container>

              <ButtonContainer insets={insets}>
                {state === State.second && (
                  <Button color={ButtonColor.GREY} onPress={handleSave}>
                    <ButtonText>Save</ButtonText>
                  </Button>
                )}
              </ButtonContainer>
            </VStack>
          </Page>
        </>
      )}
    </SafeAreaInsetsContext.Consumer>
  )

  function mergeAndDeduplicateArrays(array1: ServiceCategory[], array2: ServiceCategory[]): Item[] {
    const mergedCategories: { [id: string]: ServiceCategory } = {}

    array1.forEach((category) => {
      mergedCategories[category.id] = category
    })

    array2.forEach((category) => {
      mergedCategories[category.id] = category
    })

    const result: Item[] = Object.values(mergedCategories).map((category) => ({
      id: category.id,
      isSelected: array1.some((item) => item.id === category.id) && array2.some((item) => item.id === category.id),
      name: category.name,
    }))

    return result
  }
}

const VStack = styled.View`
  justify-content: space-between;
  flex: 1;
`
const LabelM = styled(TextStyles.LabelM)`
  margin-bottom: ${rem(10)}px;
`

const BodyM = styled(TextStyles.BodyM)`
  color: ${Colors.grayInactive};
  margin-bottom: ${rem(20)}px;
`

const ButtonText = styled(TextStyles.BodyM)`
  color: ${Colors.white};
`

const ButtonContainer = styled.View<{ insets: EdgeInsets | undefined }>`
  padding: ${rem(20)}px;
  margin-bottom: ${(props) => (props.insets?.bottom ? props.insets?.bottom : 0)}px;
  width: 100%;
  border-radius: ${rem(15)}px;
  box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.1);
`

const Container = styled.View`
  margin: ${rem(12)}px;
  flex: 1;
`

const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${Colors.graySuperLight};
`

const Page = styled.View<{ insets: EdgeInsets | null }>`
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: ${rem(630)}px;
  background-color: white;
  border-top-right-radius: ${rem(15)}px;
  border-top-left-radius: ${rem(15)}px;
`
