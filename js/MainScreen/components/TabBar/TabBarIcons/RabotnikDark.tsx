import * as React from 'react'
import Svg, { Defs, G, LinearGradient, Path, Stop } from 'react-native-svg'

import { useShouldShowRabotnikDot } from '../../../hooks/useShouldShowRabotnikDot'
import { OrangeDot } from '../OrangeDot'

export function RabotnikDark() {
  const shouldShowDot = useShouldShowRabotnikDot()
  return (
    <>
      {shouldShowDot ? <OrangeDot /> : null}
      <Svg viewBox="0 0 48 48">
        <Defs>
          <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a">
            <Stop stopColor="#FFF" stopOpacity={0.698} offset="0%" />
            <Stop stopColor="#FFF" stopOpacity={0.799} offset="100%" />
          </LinearGradient>
          <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="b">
            <Stop stopColor="#FFF" stopOpacity={0.698} offset="0%" />
            <Stop stopColor="#FFF" stopOpacity={0.799} offset="100%" />
          </LinearGradient>
        </Defs>
        <G fillRule="nonzero" fill="none">
          <Path
            d="M14 21.976V1a1 1 0 0 0-1.176-.984L1.65 2.009A2 2 0 0 0 0 3.978v18.018a2 2 0 0 0 2.004 2l10-.02a2 2 0 0 0 1.996-2ZM10 16h2v2h-2v-2Zm0-4h2v2h-2v-2Zm0-4h2v2h-2V8Zm0-4h2v2h-2V4ZM6 16h2v2H6v-2Zm0-4h2v2H6v-2Zm0-4h2v2H6V8Zm0-4h2v2H6V4ZM1.987 15.954h2v2h-2v-2Zm0-3.954h2v2h-2v-2Zm0-4h2v2h-2V8Zm0-4h2v2h-2V4ZM6 19.978h2a1 1 0 0 1 1 1V24H5v-3.022a1 1 0 0 1 1-1Z"
            fill="url(#a)"
            transform="translate(11 11)"
          />
          <Path
            d="M26 21.983V9.13a1 1 0 0 0-1.122-.992l-7.122.876A2 2 0 0 0 16 10.999v11a2 2 0 0 0 2.006 2l6-.016a2 2 0 0 0 1.994-2ZM22 19h2v2h-2v-2Zm0-4h2v2h-2v-2Zm0-4h2v2h-2v-2Zm-4 8h2v2h-2v-2Zm0-4h2v2h-2v-2Zm0-4h2v2h-2v-2Z"
            fill="url(#b)"
            transform="matrix(-1 0 0 1 53 11)"
          />
        </G>
      </Svg>
    </>
  )
}
