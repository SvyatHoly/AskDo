import { AnyAction, Middleware, Store, configureStore } from '@reduxjs/toolkit'
import { PortalProvider } from '@gorhom/portal'

import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context'

import React, { ComponentType } from 'react'
import { Provider } from 'react-redux'

import { apiMiddleware } from 'redux-api-middleware'
import { Persistor, persistStore } from 'redux-persist'
import { localStorage } from 'utils/localStorage'
import { PersistConfig, persistReducer } from 'utils/persist'

import { rootReducer } from '../reducers'

import { api } from './api'

const persistorConfig: PersistConfig<AskDo.RootState> = {
  key: 'root',
  storage: localStorage,
  whitelist: [] as const,
}

export let store: Store<AskDo.RootState, AnyAction>
let persistor: Persistor
export function middlewares(): Array<Middleware<void, AskDo.RootState, Store['dispatch']>> {
  const middleWare = [apiMiddleware, api.middleware]
  if (__DEV__) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const createDebugger = require('redux-flipper').default
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    middleWare.push(createDebugger())
  }
  return middleWare
}

export const configureAppStore = async (): Promise<Store<AskDo.RootState>> => {
  const reducer = persistReducer(persistorConfig, rootReducer)

  store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
        actionCreatorCheck: false,
      }).concat(middlewares()),
  })

  return new Promise((resolve) => {
    persistor = persistStore(store, null, () => {
      resolve(store)
    })
  })
}

/**
 * @deprecated For Screens only. Try to avoid using Redux in Storybook/components,
 * this logic will be isolated inside AppRegistry and no longer available.
 * A lot of stuff going on here, not only redux store, but Intl and Themes as well.
 * Not sure if its a good idea to wrap child components with all of this stuff.
 *
 */
export function storeWrapper(WrappedComponent: ComponentType<any>): React.FC {
  return () => (
    <Provider store={store}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <ReadyGate>
          <PortalProvider>
            <WrappedComponent />
          </PortalProvider>
        </ReadyGate>
      </SafeAreaProvider>
    </Provider>
  )
}

const ReadyGate: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <>{children}</>
}
