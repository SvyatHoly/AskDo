import { rem } from 'design-system'
import React from 'react'
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg'

interface Props {
  size?: number
}
export const PencilIcon: React.FC<Props> = ({ size = rem(19) }) => {
  return (
    <>
      <Svg width={size} height={size} viewBox={`0 0 10 9`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <G clipPath="url(#clip0_690_8153)">
          <Path
            d="M9.254 1.304L8.197.247a.845.845 0 00-1.194 0l-.994.994 2.235 2.25.994-.994a.829.829 0 00.016-1.193zm-3.642.335L1.046 6.204a.281.281 0 00-.077.143L.506 8.662c-.04.197.133.371.33.333l2.316-.463a.282.282 0 00.143-.077L7.862 3.89l-2.25-2.251z"
            fill="#062735"
          />
        </G>
        <Defs>
          <ClipPath id="clip0_690_8153">
            <Path fill="#fff" transform="translate(.5)" d="M0 0H9V9H0z" />
          </ClipPath>
        </Defs>
      </Svg>
    </>
  )
}
