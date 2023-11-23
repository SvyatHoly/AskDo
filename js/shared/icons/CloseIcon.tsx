import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const CloseIcon: React.FC = () => {
  return (
    <>
      <Svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M2 2l10 10m0-10L2 12" stroke="#000" strokeWidth={3} strokeLinecap="round" />
      </Svg>
    </>
  )
}
