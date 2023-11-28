import React from 'react'
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg'

export const EyeIcon: React.FC = () => {
  return (
    <>
      <Svg width={17} height={17} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <G clipPath="url(#clip0_733_11634)">
          <Path
            d="M8.5 13.965c-2.59 0-5.04-1.097-6.901-3.09a.607.607 0 01.887-.828C4.116 11.79 6.251 12.75 8.5 12.75c2.892 0 5.555-1.582 7.189-4.25-1.633-2.669-4.297-4.25-7.189-4.25-2.998 0-5.75 1.7-7.365 4.549A.606.606 0 11.08 8.2C1.911 4.967 5.059 3.036 8.5 3.036c3.441 0 6.59 1.93 8.421 5.165a.607.607 0 010 .598c-1.832 3.234-4.98 5.166-8.42 5.166z"
            fill="#9B9B9B"
          />
          <Path
            d="M8.499 11.536a3.04 3.04 0 01-3.036-3.035 3.04 3.04 0 013.036-3.036A3.04 3.04 0 0111.534 8.5 3.04 3.04 0 018.5 11.536zm0-4.857a1.824 1.824 0 00-1.822 1.822c0 1.004.817 1.821 1.822 1.821a1.824 1.824 0 001.821-1.821A1.824 1.824 0 008.5 6.679z"
            fill="#9B9B9B"
          />
        </G>
        <Defs>
          <ClipPath id="clip0_733_11634">
            <Path fill="#fff" d="M0 0H17V17H0z" />
          </ClipPath>
        </Defs>
      </Svg>
    </>
  )
}