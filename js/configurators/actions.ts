import { AnyAction } from '@reduxjs/toolkit'
import { DeviceEventEmitter } from 'react-native'

import { StoreDispatcher } from 'utils/reduxTools'

export const configureActions = (store: StoreDispatcher) => {
  DeviceEventEmitter.addListener('action', (event: AnyAction) => {
    store.dispatch(event)
  })
}
