import * as React from 'react'
import Svg, { Defs, G, LinearGradient, Path, Stop } from 'react-native-svg'

export function WalletDark() {
  return (
    <>
      <Svg viewBox="0 0 48 48">
        <Defs>
          <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="prefix__a">
            <Stop stopColor="#FFF" stopOpacity={0.7} offset="0%" />
            <Stop stopColor="#FFF" stopOpacity={0.799} offset="100%" />
          </LinearGradient>
        </Defs>
        <G fillRule="nonzero" fill="none">
          <Path d="M22.9 12.586l.842.842L18.42 16.5h-2.264l3.915-3.914a2 2 0 012.828 0z" fill="#FFF" opacity={0.6} />
          <Path d="M29.745 14.003l1.441 2.496h-9.764l5.591-3.228a2 2 0 012.732.732z" fill="#FFF" opacity={0.7} />
          <Path
            d="M19 6a3 3 0 013 3v1.394h-1.97a3.53 3.53 0 00-.194 7.054l.194.005H22V19a3 3 0 01-3 3H3a3 3 0 01-3-3V9a3 3 0 013-3h16zm4 6a1 1 0 011 1v2a1 1 0 01-1 1h-3a2 2 0 110-4h3z"
            fill="url(#prefix__a)"
            transform="translate(12 12)"
          />
        </G>
      </Svg>
    </>
  )
}
