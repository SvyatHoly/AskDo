import { useEffect, useState } from 'react'
import { AccessibilityInfo } from 'react-native'

export const useReduceMotion = () => {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false)

  useEffect(() => {
    async function init() {
      setShouldReduceMotion(await AccessibilityInfo.isReduceMotionEnabled())
    }
    init()

    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setShouldReduceMotion)
    return () => subscription.remove()
  }, [])

  return shouldReduceMotion
}
