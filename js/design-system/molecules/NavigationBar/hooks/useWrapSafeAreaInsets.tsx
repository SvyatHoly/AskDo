import * as React from 'react'

import { EdgeInsets, NO_INSETS_ERROR, WrapSafeAreaInsetsContext } from '../Insets'

export function useWrapSafeAreaInsets(): EdgeInsets {
  const safeArea = React.useContext(WrapSafeAreaInsetsContext)
  if (safeArea == null) {
    throw new Error(NO_INSETS_ERROR)
  }
  return safeArea
}
