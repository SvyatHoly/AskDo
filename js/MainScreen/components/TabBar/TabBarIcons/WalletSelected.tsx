import * as React from 'react'
import Svg, { Defs, G, LinearGradient, Path, Stop } from 'react-native-svg'

export function WalletSelected() {
  return (
    <Svg viewBox="0 0 48 48">
      <Defs>
        <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="prefix__b">
          <Stop stopColor="#E45DB4" offset="0%" />
          <Stop stopColor="#955EF5" offset="100%" />
        </LinearGradient>
      </Defs>
      <G filter="url(#prefix__a)" transform="translate(12 12)" fillRule="nonzero" fill="none">
        <Path d="M10.9.586l.842.842L6.42 4.5H4.156L8.071.586a2 2 0 012.828 0z" fill="#E45DB4" opacity={0.6} />
        <Path d="M17.745 2.003L19.186 4.5H9.422l5.591-3.228a2 2 0 012.732.732z" fill="#E45DB4" />
        <Path
          d="M19 6a3 3 0 013 3v1.394h-1.97a3.53 3.53 0 00-.194 7.054l.194.005H22V19a3 3 0 01-3 3H3a3 3 0 01-3-3V9a3 3 0 013-3h16zm4 6a1 1 0 011 1v2a1 1 0 01-1 1h-3a2 2 0 110-4h3z"
          fill="url(#prefix__b)"
        />
      </G>
    </Svg>
  )
}
