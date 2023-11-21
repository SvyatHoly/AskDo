import React from 'react'
import Svg, { Path, G, Defs, ClipPath } from 'react-native-svg'

export const Search: React.FC = () => {
  return (
    <>
      <Svg width={26} height={26} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <G clipPath="url(#clip0_1433_3328)" fill="#232323">
          <Path d="M20.427 15.842a10.857 10.857 0 10-4.586 4.587l4.608 4.61a3.244 3.244 0 104.592-4.583l-4.614-4.614zm-18.26-5.009a8.667 8.667 0 118.666 8.667 8.676 8.676 0 01-8.666-8.667zm21.341 12.684a1.083 1.083 0 01-1.516 0l-4.298-4.299a10.938 10.938 0 001.517-1.523l4.303 4.296a1.058 1.058 0 01-.01 1.525h.004z" />
          <Path d="M10.833 4.333a6.507 6.507 0 00-6.5 6.5 1.083 1.083 0 102.167 0A4.333 4.333 0 0110.833 6.5a1.083 1.083 0 000-2.167z" />
        </G>
        <Defs>
          <ClipPath id="clip0_1433_3328">
            <Path fill="#fff" d="M0 0H26V26H0z" />
          </ClipPath>
        </Defs>
      </Svg>
    </>
  )
}
