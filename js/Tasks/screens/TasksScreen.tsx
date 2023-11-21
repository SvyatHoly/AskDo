import React from 'react'
import { EdgeInsets, SafeAreaInsetsContext } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { Filters } from '../components/Filters'

export const TasksScreen: React.FC = () => {
  const onPress = () => {
    console.log('press')
  }
  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <Page insets={insets}>
          <Filters />
        </Page>
      )}
    </SafeAreaInsetsContext.Consumer>
  )
}

const Page = styled.View<{ insets: EdgeInsets | null }>`
  flex: 1;
  margin-top: ${(props) => props.insets?.top ?? 0}px;
`
