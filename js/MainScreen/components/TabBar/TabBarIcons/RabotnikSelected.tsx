import * as React from 'react'
import Svg, { Defs, G, LinearGradient, Path, Stop, Use } from 'react-native-svg'

export function RabotnikSelected() {
  return (
    <Svg viewBox="0 0 48 48">
      <Defs>
        <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="c">
          <Stop stopColor="#FF5C9D" offset="0%" />
          <Stop stopColor="#955EF5" offset="100%" />
        </LinearGradient>
        <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="f">
          <Stop stopColor="#FF5C9D" offset="0%" />
          <Stop stopColor="#955EF5" offset="100%" />
        </LinearGradient>
        <Path
          d="M14 21.976V1a1 1 0 0 0-1.176-.984L1.65 2.009A2 2 0 0 0 0 3.978v18.018a2 2 0 0 0 2.004 2l10-.02a2 2 0 0 0 1.996-2ZM10 16h2v2h-2v-2Zm0-4h2v2h-2v-2Zm0-4h2v2h-2V8Zm0-4h2v2h-2V4ZM6 16h2v2H6v-2Zm0-4h2v2H6v-2Zm0-4h2v2H6V8Zm0-4h2v2H6V4ZM1.987 15.954h2v2h-2v-2Zm0-3.954h2v2h-2v-2Zm0-4h2v2h-2V8Zm0-4h2v2h-2V4ZM6 19.978h2a1 1 0 0 1 1 1V24H5v-3.022a1 1 0 0 1 1-1Z"
          id="b"
        />
        <Path
          d="M26 21.983V9.13a1 1 0 0 0-1.122-.992l-7.122.876A2 2 0 0 0 16 10.999v11a2 2 0 0 0 2.006 2l6-.016a2 2 0 0 0 1.994-2ZM22 19h2v2h-2v-2Zm0-4h2v2h-2v-2Zm0-4h2v2h-2v-2Zm-4 8h2v2h-2v-2Zm0-4h2v2h-2v-2Zm0-4h2v2h-2v-2Z"
          id="e"
        />
      </Defs>
      <G fillRule="nonzero" fill="none">
        <G transform="translate(11 11)">
          {/* @ts-expect-error This code leads to the bug! It was suppressed only because it cannot be fixed as part of the "turn on typescript check" task. Pls fix it during refactoring of this part of the code. */}
          <Use fill="#000" filter="url(#a)" xlinkHref="#b" />
          <Use fill="url(#c)" xlinkHref="#b" />
        </G>
        <G transform="matrix(-1 0 0 1 53 11)">
          {/* @ts-expect-error This code leads to the bug! It was suppressed only because it cannot be fixed as part of the "turn on typescript check" task. Pls fix it during refactoring of this part of the code. */}
          <Use fill="#000" filter="url(#d)" xlinkHref="#e" />
          <Use fill="url(#f)" xlinkHref="#e" />
        </G>
      </G>
    </Svg>
  )
}
