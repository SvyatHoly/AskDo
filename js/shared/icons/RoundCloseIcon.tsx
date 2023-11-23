import React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

export const RoundCloseIcon: React.FC = () => {
  return (
    <>
      <Svg width={15} height={16} viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Rect x={15} y={15.5} width={15} height={15} rx={7.5} transform="rotate(180 15 15.5)" fill="#9B9B9B" />
        <Path d="M5 5.5l5 5m0-5l-5 5" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" />
      </Svg>
    </>
  )
}
