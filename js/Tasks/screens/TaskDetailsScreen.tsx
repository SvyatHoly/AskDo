import React from 'react'
import { EdgeInsets, SafeAreaInsetsContext } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { Colors, LeftButtonType, NavigationBar, TextStyles, rem } from 'design-system'
import { Navigation } from 'navigation'
import { TaskCardModel } from 'Tasks/types'
import { TaskDetails } from '../components/TaskDetails'
export const TaskDetailsScreen: React.FC = () => {
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
  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <Page insets={insets}>
          <NavigationBar
            ignoreSafeArea={true}
            leftButtonType={LeftButtonType.BACK}
            onLeftButtonPress={() => Navigation.pop()}
            title="Install a countertop in the kitchen"
          />
          <TaskDetails insets={insets} />
        </Page>
      )}
    </SafeAreaInsetsContext.Consumer>
  )
}

const VStack = styled.View`
  flex-direction: column;
  padding-left: ${rem(12)}px;
  padding-right: ${rem(12)}px;
  padding-top: ${rem(6)}px;
`
const Title = styled(TextStyles.TitleL)``
const Page = styled.View<{ insets: EdgeInsets | null }>`
  flex: 1;
  width: 100%;
  margin-top: ${(props) => props.insets?.top ?? 0}px;
  background-color: ${Colors.white};
`
