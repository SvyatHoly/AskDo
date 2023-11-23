import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

const showEvent = 'keyboardDidShow'
const hideEvent = 'keyboardDidHide'

export const useKeyboard = (): [boolean, () => void] => {
  const [visible, setVisible] = useState(false)

  function dismiss() {
    Keyboard.dismiss()
    setVisible(false)
  }

  useEffect(() => {
    function onKeyboardShow() {
      setVisible(true)
    }

    function onKeyboardHide() {
      setVisible(false)
    }

    Keyboard.addListener(showEvent, onKeyboardShow)
    Keyboard.addListener(hideEvent, onKeyboardHide)

    return () => {
      Keyboard.addListener(showEvent, onKeyboardShow).remove()
      Keyboard.addListener(hideEvent, onKeyboardHide).remove()
    }
  }, [])

  return [visible, dismiss]
}
