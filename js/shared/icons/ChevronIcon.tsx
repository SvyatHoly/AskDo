import React from 'react'
import Svg, { Path } from 'react-native-svg'

interface Props {
  isUp: boolean
}
export const ChevronIcon: React.FC<Props> = ({ isUp }) => {
  return (
    <>
      {isUp ? (
        <Svg width={11} height={8} viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.707 6.957a1 1 0 01-1.414 0L5.5 3.164 1.707 6.957A1 1 0 01.293 5.543l4.5-4.5a1 1 0 011.414 0l4.5 4.5a1 1 0 010 1.414z"
            fill="#9B9B9B"
          />
        </Svg>
      ) : (
        <Svg width={11} height={7} viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M.293.543a1 1 0 011.414 0L5.5 4.336 9.293.543a1 1 0 111.414 1.414l-4.5 4.5a1 1 0 01-1.414 0l-4.5-4.5a1 1 0 010-1.414z"
            fill="#9B9B9B"
          />
        </Svg>
      )}
    </>
  )
}
