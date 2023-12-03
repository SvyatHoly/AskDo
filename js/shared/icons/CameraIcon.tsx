import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const CameraIcon: React.FC = () => {
  return (
    <>
      <Svg width={34} height={35} viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M26.916 10.417h-.566c-.567 0-.992-.284-1.275-.85l-1.7-3.259c-.425-.991-1.417-1.558-2.55-1.558h-7.792c-.992 0-1.983.567-2.55 1.558L8.925 9.567c-.284.566-.709.85-1.275.85h-.567c-3.117 0-5.667 2.55-5.667 5.666v8.5c0 3.117 2.55 5.667 5.667 5.667h19.834c3.116 0 5.666-2.55 5.666-5.667v-8.5c0-3.116-2.55-5.666-5.666-5.666zM17 24.583c-3.117 0-5.667-2.55-5.667-5.666 0-3.117 2.55-5.667 5.667-5.667 3.116 0 5.666 2.55 5.666 5.667 0 3.116-2.55 5.666-5.666 5.666z"
          fill="#9B9B9B"
        />
      </Svg>
    </>
  )
}
