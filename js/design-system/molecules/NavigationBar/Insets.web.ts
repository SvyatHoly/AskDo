import React from 'react'

interface EdgeInsets {
  top: number
  right: number
  bottom: number
  left: number
}

const EdgeInsetsParams = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20,
} as EdgeInsets

const ISafeAreaInsetsContext = React.createContext<EdgeInsets | null>(EdgeInsetsParams)

const SafeAreaInsetsContextConsumer = ISafeAreaInsetsContext.Consumer
const WrapSafeAreaInsetsContext = ISafeAreaInsetsContext

export const NO_INSETS_ERROR =
  'No safe area value available. Make sure you are rendering `<SafeAreaProvider>` at the top of your app.'

export type { EdgeInsets }
export { SafeAreaInsetsContextConsumer }
export { WrapSafeAreaInsetsContext }
