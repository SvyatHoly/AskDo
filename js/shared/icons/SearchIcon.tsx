import React from 'react'
import Svg, { Path, G, ClipPath, Defs } from 'react-native-svg'

export const SearchIcon: React.FC = () => {
  return (
    <>
      <Svg width={17} height={18} viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <G clipPath="url(#clip0_1609_4173)" fill="#9B9B9B">
          <Path d="M13.356 10.859a7.099 7.099 0 10-2.999 2.999l3.013 3.014a2.121 2.121 0 003.003-2.997l-3.017-3.016zM1.416 7.583a5.667 5.667 0 115.667 5.667 5.673 5.673 0 01-5.666-5.667zm13.955 8.293a.708.708 0 01-.992 0l-2.81-2.81c.363-.299.695-.632.992-.996l2.813 2.81a.692.692 0 01-.006.996h.003z" />
          <Path d="M7.083 3.333a4.254 4.254 0 00-4.25 4.25.708.708 0 001.417 0A2.833 2.833 0 017.083 4.75a.708.708 0 100-1.417z" />
        </G>
        <Defs>
          <ClipPath id="clip0_1609_4173">
            <Path fill="#fff" transform="translate(0 .5)" d="M0 0H17V17H0z" />
          </ClipPath>
        </Defs>
      </Svg>
    </>
  )
}
