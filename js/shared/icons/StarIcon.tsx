import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const StarIcon: React.FC = () => {
  return (
    <>
      <Svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M6.043 1.174c.301-.899 1.613-.899 1.914 0l.963 2.872c.134.401.52.673.956.673h3.116c.975 0 1.38 1.209.591 1.764l-2.52 1.775a.958.958 0 00-.366 1.09l.963 2.872c.301.898-.76 1.644-1.548 1.09l-2.52-1.776a1.032 1.032 0 00-1.183 0L3.888 13.31c-.788.556-1.85-.191-1.548-1.09l.963-2.871a.958.958 0 00-.365-1.09L.417 6.483c-.789-.555-.384-1.764.59-1.764h3.117c.436 0 .822-.272.956-.673l.963-2.872z"
          fill="#FFCA42"
        />
      </Svg>
    </>
  )
}
