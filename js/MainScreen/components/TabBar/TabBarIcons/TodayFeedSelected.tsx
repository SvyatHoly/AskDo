import React from 'react'
import Svg, { Defs, G, LinearGradient, Path, Stop, Use } from 'react-native-svg'

import { useShouldShowTodayDot } from 'MainScreen/hooks/useShouldShowTodayDot'

import { OrangeDot } from '../OrangeDot'

export const TodayFeedSelected = () => {
  const shouldShowDot = useShouldShowTodayDot()

  return (
    <>
      {shouldShowDot ? <OrangeDot /> : null}
      <Svg viewBox="0 0 48 48">
        <Defs>
          <LinearGradient id="c" x1="50%" x2="50%" y1="0%" y2="100%">
            <Stop offset="0%" stopColor="#FF5C9D" />
            <Stop offset="100%" stopColor="#955EF5" />
          </LinearGradient>
          <Path
            id="b"
            d="M18.18 0a2.018 2.018 0 0 1 2.02 2.02v16.16a2.018 2.018 0 0 1-2.02 2.02H2.02A2.018 2.018 0 0 1 0 18.18V4.713a2.018 2.018 0 0 1 2.02-2.02h.673V2.02A2.018 2.018 0 0 1 4.714 0ZM2.693 4.04H2.02a.67.67 0 0 0-.673.673v13.468a.672.672 0 0 0 1.346 0V4.04Zm12.794 9.479h-8.08a.674.674 0 0 0 0 1.346h8.08a.674.674 0 0 0 0-1.346Zm0-2.71h-8.08a.674.674 0 0 0 0 1.346h8.08a.674.674 0 0 0 0-1.347Zm0-2.712h-8.08a.674.674 0 0 0 0 1.347h8.08a.674.674 0 0 0 0-1.347Zm-4.04-2.71h-4.04a.674.674 0 0 0 0 1.346h4.04a.674.674 0 0 0 0-1.347Z"
          />
        </Defs>
        <G fill="none" fillRule="nonzero" transform="translate(14 14)">
          <Use xlinkHref="#b" fill="#000" />
          <Use xlinkHref="#b" fill="url(#c)" />
        </G>
      </Svg>
    </>
  )
}
