import React from 'react'
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg'

import { useShouldShowTodayDot } from '../../../hooks/useShouldShowTodayDot'
import { OrangeDot } from '../OrangeDot'

export const TodayLight = () => {
  const shouldShowDot = useShouldShowTodayDot()

  return (
    <>
      {shouldShowDot ? <OrangeDot /> : null}
      <Svg viewBox="0 0 48 48">
        <Defs>
          <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="prefix__a">
            <Stop stopColor="#636F82" offset="0%" />
            <Stop stopColor="#748195" offset="100%" />
          </LinearGradient>
        </Defs>
        <Path
          d="M9.686 1.145l-9 7.84A2 2 0 000 10.493V21a2 2 0 002 2h6a1 1 0 001-1v-5a2 2 0 114 0v5a1 1 0 001 1h6a2 2 0 002-2V10.493a2 2 0 00-.686-1.508l-9-7.84a2 2 0 00-2.628 0z"
          transform="translate(13 12)"
          fill="url(#prefix__a)"
          fillRule="nonzero"
        />
      </Svg>
    </>
  )
}
