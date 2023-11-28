import React from 'react'
import Svg, { Circle } from 'react-native-svg'

interface Props {
  color: string
}
export const DotIcon: React.FC<Props> = ({ color }) => {
  return (
    <>
      <Svg width={10} height={11} viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Circle cx={5} cy={5.5} r={5} fill={color} />
      </Svg>
    </>
  )
}
