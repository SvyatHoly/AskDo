import { Store } from '@reduxjs/toolkit'

import { isReadySelector } from 'reducers/config'
import { tokenSelector } from 'reducers/session'
import { api } from 'utils/api'
import { listenStore } from 'utils/listenStore'

export function handleSession(store: Store<AskDo.RootState>) {
  let prevToken: string | undefined
  listenStore(
    store,
    (isReady, token) => {
      if (!isReady) {
        return
      }
      if (prevToken && prevToken !== token) {
        store.dispatch(api.util.resetApiState())
      }
      prevToken = token
    },
    [isReadySelector, tokenSelector]
  )
}
