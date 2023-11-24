import React from 'react'
import Svg, { Path, G, ClipPath, Defs } from 'react-native-svg'

export const TimeHistoryIcon: React.FC = () => {
  return (
    <>
      <Svg width={21} height={21} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.18 5.864h1.456a.773.773 0 110 1.545H3.773a1 1 0 01-1-1V3.54a.773.773 0 011.545 0v.977C6.047 2.704 8.017 2 10.5 2a8.5 8.5 0 11-8.465 9.272c-.039-.425.311-.772.738-.772.426 0 .768.347.815.771A6.956 6.956 0 1010.5 3.545c-2.195 0-3.83.612-5.32 2.319zm6.093 3.863h2.318a.773.773 0 110 1.546h-2.864a1 1 0 01-1-1V6.636a.773.773 0 111.546 0v3.091z"
          fill="#9B9B9B"
        />
      </Svg>
    </>
  )
}
