import React from 'react'
import Svg, { Defs, G, LinearGradient, Path, Stop } from 'react-native-svg'

export const MarketSelected: React.FC = () => {
  return (
    <Svg viewBox="0 0 48 48">
      <Defs>
        <LinearGradient x1="100%" y1="4.08%" x2="0%" y2="95.92%" id="prefix__b">
          <Stop stopColor="#FF5C9D" offset="0%" />
          <Stop stopColor="#955EF5" offset="100%" />
        </LinearGradient>
      </Defs>
      <G filter="url(#prefix__a)" transform="translate(10 12)" fill="none" fillRule="evenodd">
        <Path fill={'#fff'} d="M3 12h10v7H3z" />
        <Path
          d="M13 9a3 3 0 012.995 2.824L16 12v8a3 3 0 01-2.824 2.995L13 23H3a3 3 0 01-2.995-2.824L0 20v-8a3 3 0 012.824-2.995L3 9h10zm3-9c2.126 0 3.882 1.559 3.995 3.55l.005.2V4h1a3 3 0 013 3v9a3 3 0 01-3 3h-3.5v-7A4.5 4.5 0 0013 7.5H8V7a3 3 0 013-3h1v-.25C12 1.679 13.79 0 16 0zm-4.8 13c-.442 0-.8.373-.8.833 0 1.381-1.074 2.667-2.4 2.667-1.273 0-2.314-1.185-2.395-2.501l-.005-.166-.007-.113c-.058-.434-.428-.748-.847-.718-.42.03-.746.394-.746.831C4 16.134 5.79 18 8 18s4-1.866 4-4.167c0-.46-.358-.833-.8-.833zm4.882-11.503c-1.295-.041-2.39.887-2.477 2.099l-.005.154V4h4.8v-.25c.002-1.214-1.023-2.211-2.318-2.253z"
          fill="url(#prefix__b)"
          fillRule="nonzero"
        />
      </G>
    </Svg>
  )
}
