import React, { useRef } from 'react'
import { EdgeInsets, SafeAreaInsetsContext } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { Filters } from '../components/Filters'
import { Navigation } from 'navigation'
import { screens } from '../constants'
import { PopupPresenter } from 'shared/PopupPresenter'
import { FindTask } from '../components/FindTask'
import { FilterTasks } from '../components/FilterTasks'

export const TasksScreen: React.FC = () => {
  const ref = useRef(null)

  const onPress = () => {
    console.log('🚀 ~ file: TasksScreen.tsx:10 ~ onPress ~ onPress:')
    // Navigation.showModal(screens.FindTask)
    ref.current?.present()
  }

  const onClose = () => {
    ref.current?.close()
  }

  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <Page insets={insets}>
          <Filters onClick={onPress} />
          <PopupPresenter ref={ref} component={FilterTasks} forwardProps={{ onClose }} />
        </Page>
      )}
    </SafeAreaInsetsContext.Consumer>
  )
}

const Page = styled.View<{ insets: EdgeInsets | null }>`
  flex: 1;
  margin-top: ${(props) => props.insets?.top ?? 0}px;
`
