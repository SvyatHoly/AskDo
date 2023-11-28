import React, { useRef } from 'react'
import { EdgeInsets, SafeAreaInsetsContext } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { ControlBar } from '../components/ControlBar'
import { PopupPresenter } from 'shared/PopupPresenter'
import { FindTask } from '../components/FindTask'
import { FilterTasks } from '../components/FilterTasks'
import { MODAL_TYPE } from 'Tasks/constants'

import { TasksList } from '../components/TasksList'

export const TasksScreen: React.FC = () => {
  const findRef = useRef(null)
  const filterRef = useRef(null)

  const onPress: (arg: MODAL_TYPE) => void = (modalType) => {
    switch (modalType) {
      case MODAL_TYPE.filter:
        return filterRef.current?.present()
      case MODAL_TYPE.find:
        return findRef.current?.present()
    }
  }

  const onClose = () => {
    findRef.current?.close()
    filterRef.current?.close()
  }

  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <Page insets={insets}>
          <ControlBar onClick={onPress} />
          <TasksList />
          <PopupPresenter ref={findRef} component={FindTask} forwardProps={{ onClose }} />
          <PopupPresenter ref={filterRef} component={FilterTasks} forwardProps={{ onClose }} />
        </Page>
      )}
    </SafeAreaInsetsContext.Consumer>
  )
}

const Page = styled.View<{ insets: EdgeInsets | null }>`
  flex: 1;
  width: 100%;
  margin-top: ${(props) => props.insets?.top ?? 0}px;
`
