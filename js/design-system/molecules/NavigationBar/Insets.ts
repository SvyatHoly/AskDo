import { EdgeInsets, SafeAreaInsetsContext } from 'react-native-safe-area-context'

const SafeAreaInsetsContextConsumer = SafeAreaInsetsContext.Consumer
const WrapSafeAreaInsetsContext = SafeAreaInsetsContext

export const NO_INSETS_ERROR =
  'No safe area value available. Make sure you are rendering `<SafeAreaProvider>` at the top of your app.'

export type { EdgeInsets }
export { SafeAreaInsetsContextConsumer }
export { WrapSafeAreaInsetsContext }
