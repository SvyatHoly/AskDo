import React from 'react'
import Svg, { Defs, G, LinearGradient, Path, Stop, Use } from 'react-native-svg'

import { useShouldShowTodayDot } from '../../../hooks/useShouldShowTodayDot'
import { OrangeDot } from '../OrangeDot'

export const TodaySelected = () => {
  const shouldShowDot = useShouldShowTodayDot()

  return (
    <>
      {shouldShowDot ? <OrangeDot /> : null}
      <Svg viewBox="0 0 48 48">
        <Defs>
          <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="prefix__c">
            <Stop stopColor="#FF5C9D" offset="0%" />
            <Stop stopColor="#955EF5" offset="100%" />
          </LinearGradient>
          <Path
            d="M22.686 13.145l-9 7.84A2 2 0 0013 22.493V33a2 2 0 002 2h6a1 1 0 001-1v-5a2 2 0 114 0v5a1 1 0 001 1h6a2 2 0 002-2V22.493a2 2 0 00-.686-1.508l-9-7.84a2 2 0 00-2.628 0z"
            id="prefix__b"
          />
        </Defs>
        <G fillRule="nonzero" fill="none">
          {/* @ts-expect-error This code leads to the bug! It was suppressed only because it cannot be fixed as part of the "turn on typescript check" task. Pls fix it during refactoring of this part of the code. */}
          <Use fill="#000" filter="url(#prefix__a)" xlinkHref="#prefix__b" />
          <Use fill="url(#prefix__c)" xlinkHref="#prefix__b" />
        </G>
      </Svg>
    </>
  )
}
