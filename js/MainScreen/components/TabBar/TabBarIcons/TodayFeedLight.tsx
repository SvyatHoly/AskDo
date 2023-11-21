import React from 'react'
import Svg, { LinearGradient, Path, Stop } from 'react-native-svg'

import { useShouldShowTodayDot } from 'MainScreen/hooks/useShouldShowTodayDot'

import { OrangeDot } from '../OrangeDot'

export const TodayFeedLight = () => {
  const shouldShowDot = useShouldShowTodayDot()

  return (
    <>
      {shouldShowDot ? <OrangeDot /> : null}
      <Svg viewBox="0 0 48 48">
        <LinearGradient id="a" x1="50%" x2="50%" y1="0%" y2="100%">
          <Stop offset={0} stopColor="#656f80" />
          <Stop offset={1} stopColor="#768093" />
        </LinearGradient>
        <Path
          fill="url(#a)"
          fillRule="evenodd"
          d="M18.18 0a2.018 2.018 0 0 1 2.02 2.02v16.16a2.018 2.018 0 0 1-2.02 2.02H2.02A2.018 2.018 0 0 1 0 18.18V4.713a2.018 2.018 0 0 1 2.02-2.02h.673V2.02A2.018 2.018 0 0 1 4.714 0zM2.693 4.04H2.02a.67.67 0 0 0-.673.673v13.468a.672.672 0 0 0 1.346 0zm12.794 9.479h-8.08a.674.674 0 0 0 0 1.346h8.08a.674.674 0 0 0 0-1.346zm0-2.71h-8.08a.674.674 0 0 0 0 1.346h8.08a.674.674 0 0 0 0-1.347zm0-2.712h-8.08a.674.674 0 0 0 0 1.347h8.08a.674.674 0 0 0 0-1.347zm-4.04-2.71h-4.04a.674.674 0 0 0 0 1.346h4.04a.674.674 0 0 0 0-1.347z"
          transform="translate(14 14)"
        />
      </Svg>
    </>
  )
}
