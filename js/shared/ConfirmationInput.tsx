import { Colors, rem } from 'design-system'
import React, { useRef, useState } from 'react'
import styled from 'styled-components/native'

interface Props {
  length: number
  onComplete: (arg: number) => void
}

export const ConfirmationInput: React.FC<Props> = ({ length, onComplete }) => {
  const [code, setCode] = useState(new Array(length).fill(''))
  const inputsRef = useRef([])

  const focusPrevious = (key: string, index: number) => {
    if (key === 'Backspace' && index !== 0) {
      inputsRef.current[index - 1].focus()
    }
  }

  const handleChange = (text: string, index: number) => {
    const newCode = [...code]
    newCode[index] = text
    setCode(newCode)

    if (index < length - 1 && text) {
      inputsRef.current[index + 1].focus()
    } else if (index > 0 && !text) {
      inputsRef.current[index - 1].focus()
    }

    if (newCode.every((digit) => digit !== '')) {
      onComplete(newCode.join(''))
    }
  }

  return (
    <CodeContainer>
      {code.map((_, index) => (
        <CodeInput
          key={index}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace') {
              focusPrevious(nativeEvent.key, index)
            }
          }}
          value={code[index]}
          ref={(ref) => {
            inputsRef.current[index] = ref
          }}
          returnKeyType="done"
          textContentType={index === 0 ? 'oneTimeCode' : 'none'} // For iOS to suggest the code from SMS
        />
      ))}
    </CodeContainer>
  )
}

const CodeContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: ${rem(12)}px;
`

const CodeInput = styled.TextInput`
  background-color: ${Colors.grayForInput};
  padding: ${rem(10)}px;
  text-align: center;
  border-radius: ${rem(10)}px;
  font-size: 18px;
  width: ${rem(35)}px;
`
