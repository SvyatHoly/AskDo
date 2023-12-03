import React from 'react'
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg'

export const PlusIcon: React.FC = () => {
  return (
    <>
      <Svg width={19} height={19} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <G clipPath="url(#clip0_2540_3455)">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.5 0A1.5 1.5 0 0111 1.5V8h6.5a1.5 1.5 0 010 3H11v6.5a1.5 1.5 0 01-3 0V11H1.5a1.5 1.5 0 010-3H8V1.5A1.5 1.5 0 019.5 0z"
            fill="#062735"
          />
        </G>
        <Defs>
          <ClipPath id="clip0_2540_3455">
            <Path fill="#fff" d="M0 0H19V19H0z" />
          </ClipPath>
        </Defs>
      </Svg>
    </>
  )
}
