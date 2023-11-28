import React from 'react'
import Svg, { Circle, G } from 'react-native-svg'

export const ThreeDotsIcon: React.FC = () => {
  return (
    <>
      <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <G fill="#062735">
          <Circle cx={6.93333} cy={15.9333} r={2.93333} />
          <Circle cx={15.8} cy={15.9333} r={2.93333} />
          <Circle cx={24.6667} cy={15.9333} r={2.93333} />
        </G>
      </Svg>
    </>
  )
}
