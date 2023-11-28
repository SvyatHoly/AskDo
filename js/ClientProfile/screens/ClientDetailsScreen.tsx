import React from 'react'
import { EdgeInsets, SafeAreaInsetsContext } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { Colors, LeftButtonType, NavigationBar, TextStyles, rem } from 'design-system'
import { Navigation } from 'navigation'
import { Header } from '../components/Header'
import { Feedback } from 'ClientProfile/components/Feedback'

export const TaskDetailsScreen: React.FC = () => {
  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <Page insets={insets}>
          <NavigationBar
            ignoreSafeArea={true}
            leftButtonType={LeftButtonType.BACK}
            onLeftButtonPress={() => Navigation.pop()}
            title="Client’s profile"
          />
          <Header
            image="https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg"
            name="Ozan"
            lastVisit={1700838000}
            since={1700838000}
            isConfirmed={true}
          />
          <Feedback />
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
