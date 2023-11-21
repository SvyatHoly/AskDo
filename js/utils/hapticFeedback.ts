import ReactNativeHapticFeedback, { HapticFeedbackTypes, HapticOptions } from 'react-native-haptic-feedback'

const CONFIG = {
  enableVibrateFallback: false,
  ignoreAndroidSystemSettings: true,
}

export type HapticFeedbackType = `${HapticFeedbackTypes}`

export const triggerHaptic = (type: HapticFeedbackType, configOverrides?: HapticOptions) => {
  ReactNativeHapticFeedback.trigger(type, { ...CONFIG, ...configOverrides })
}
