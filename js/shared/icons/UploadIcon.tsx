import React from 'react'
import Svg, { G, Path } from 'react-native-svg'

export const UploadIcon: React.FC = () => {
  return (
    <>
      <Svg width={25} height={24} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <G stroke="#000" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M4.5 13v6a2 2 0 002 2h12a2 2 0 002-2v-6M12.5 3v12m0 0L9 11.5m3.5 3.5l3.5-3.5" />
        </G>
      </Svg>
    </>
  )
}
