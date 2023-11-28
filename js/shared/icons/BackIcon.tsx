import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const BackIcon: React.FC = () => {
  return (
    <>
      <Svg width={12} height={20} viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M10 2l-8 8 8 8" stroke="#062735" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    </>
  )
}
