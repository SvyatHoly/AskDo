import React from 'react'
import Svg, { Path, G, ClipPath, Defs } from 'react-native-svg'

export const LocationIcon: React.FC = () => {
  return (
    <>
      <Svg width={18} height={21} viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <G fill="#9B9B9B">
          <Path d="M14.725 2.526a8.626 8.626 0 00-12.199 12.2l3.215 3.214a.788.788 0 001.113-1.114L3.64 13.612a7.055 7.055 0 119.972 0l-5.543 5.543a.784.784 0 000 1.113.784.784 0 001.114 0l5.542-5.543a8.624 8.624 0 000-12.199z" />
          <Path d="M12.546 8.68a3.92 3.92 0 10-7.84 0 3.92 3.92 0 007.84 0zm-6.272 0a2.352 2.352 0 114.704 0 2.352 2.352 0 01-4.704 0z" />
        </G>
      </Svg>
    </>
  )
}
