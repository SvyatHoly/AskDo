import * as React from 'react'
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg'

export function SocialLight() {
  return (
    <Svg viewBox="0 0 48 48">
      <Defs>
        <LinearGradient x1="100%" y1="23.111%" x2="0%" y2="76.889%" id="prefix__a">
          <Stop stopColor="#636F82" offset="0%" />
          <Stop stopColor="#748195" offset="100%" />
        </LinearGradient>
      </Defs>
      <Path
        d="M12.129 17c2.069 0 3.759 1.663 3.866 3.755l.005.21v.242a.784.784 0 01-.774.793H.774a.78.78 0 01-.767-.686L0 21.207v-.241c0-2.12 1.623-3.851 3.665-3.96L3.871 17h8.258zM8 7a4 4 0 110 8 4 4 0 010-8zm18.129 3c2.069 0 3.759 1.663 3.866 3.755l.005.21v.242a.784.784 0 01-.774.793H18a2 2 0 01-2-2v-1a2 2 0 012-2h8.129zM22 0a4 4 0 110 8 4 4 0 010-8z"
        transform="translate(8 12)"
        fill="url(#prefix__a)"
        fillRule="nonzero"
      />
    </Svg>
  )
}
