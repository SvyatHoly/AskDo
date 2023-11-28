import React from 'react'
import { EdgeInsets, SafeAreaInsetsContext } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { Button, Colors, LeftButtonType, NavigationBar, TextStyles, rem } from 'design-system'
import { Navigation } from 'navigation'
import { TaskCardModel, Trait, TraitType } from 'Tasks/types'
import { TraitsContainer } from './TraitsContainer'
import { Price } from './Price'
import { Details } from './Details'
import { Author } from './Author'
import { ScrollView } from 'react-native-gesture-handler'

interface Props {
  insets?: EdgeInsets
}
export const TaskDetails: React.FC<Props> = ({ insets }) => {
  const model: TaskCardModel = {
    id: '1',
    type: 'Installation',
    price: 123,
    currency: 'USD',
    description: 'Install a countertop in the kitchen without problems',
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

  const traits: Trait[] = [
    { type: TraitType.STATUS, value: 1 },
    { type: TraitType.CREATED, value: 1700838000 },
    { type: TraitType.VIEWS, value: 134 },
    { type: TraitType.RESPONDED, value: 34 },
  ]
  return (
    <VStackOut>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: rem(16),
        }}>
        <VStack>
          <Title>{model.description}</Title>
          <Price value={1350} currency="TRY" additionalInfo="Direct to executor" />
          <TraitsContainer traits={traits} />
          <Details
            location={'Istanbul, Yalnız Selvi Cd. 6D1'}
            startDate={1700842610}
            finishDate={1700899000}
            locationDescription={'In my office'}
            taskInfo={
              'Harika bir öğretmen. Hemen çocukla ortak bir dil buldum. Açıklıyor çok erişilebilir. Çocuk mutlu.'
            }
          />
          <Author
            image="https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg"
            name="Ozan"
            lastVisit={1700838000}
          />
        </VStack>
      </ScrollView>
      <ButtonContainer insets={insets}>
        <Button backgroundColor={Colors.normalBlue} onPress={() => {}}>
          <ButtonText>Respond</ButtonText>
        </Button>
      </ButtonContainer>
    </VStackOut>
  )
}

const ButtonText = styled(TextStyles.BodyM)``

const ButtonContainer = styled.View<{ insets: EdgeInsets | undefined }>`
  padding: ${rem(20)}px;
  margin-bottom: ${(props) => (props.insets?.bottom ? props.insets?.bottom + 87 : 87)}px;
  width: 100%;
  background-color: ${Colors.greyButtonBackground};
  border-radius: ${rem(15)}px;
  box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.1);
`

const VStackOut = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
`

const VStack = styled.View`
  flex-direction: column;
  padding-left: ${rem(12)}px;
  padding-right: ${rem(12)}px;
  padding-top: ${rem(6)}px;
  gap: ${rem(14)}px;
`
const Title = styled(TextStyles.TitleL)``
