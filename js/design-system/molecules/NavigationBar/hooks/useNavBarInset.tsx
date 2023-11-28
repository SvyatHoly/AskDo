import { Platform } from 'react-native'

import { useWrapSafeAreaInsets } from './useWrapSafeAreaInsets'

export const NAV_BAR_HEIGHT = Platform.select({ ios: 44, default: 56 })
export const NAV_BAR_SMALL_HEIGHT = 32

const useNavBarInset = () => {
  const insets = useWrapSafeAreaInsets()
  return insets.top + NAV_BAR_HEIGHT
}

export default useNavBarInset
