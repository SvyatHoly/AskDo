import React from 'react'
import Svg, { Path, G } from 'react-native-svg'

export const Tasks: React.FC = ({ isSelected }: { isSelected?: boolean }) => {
  console.log('🚀 ~ file: Tasks.tsx:5 ~ isSelected:', isSelected)
  return (
    <>
      {isSelected ? (
        <Svg width={20} height={19} viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.959 2.5A3 3 0 0012 0H3a3 3 0 00-3 3v10a3 3 0 003 3h2.5V6.5a3 3 0 013-3H15V3c0-.17-.014-.337-.041-.5z"
            fill="#062735"
          />
          <G fillRule="evenodd" clipRule="evenodd" fill="#062735">
            <Path d="M8.5 7a.5.5 0 01.5-.5h7a.5.5 0 010 1H9a.5.5 0 01-.5-.5zM9.5 10a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zM7.5 13a.5.5 0 01.5-.5h6a.5.5 0 010 1H8a.5.5 0 01-.5-.5zM10.5 15a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5z" />
            <Path d="M17 4H8a2 2 0 00-2 2v10a2 2 0 002 2h9a2 2 0 002-2V6a2 2 0 00-2-2zM8 3a3 3 0 00-3 3v10a3 3 0 003 3h9a3 3 0 003-3V6a3 3 0 00-3-3H8z" />
          </G>
        </Svg>
      ) : (
        <Svg width={20} height={19} viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 1H3a2 2 0 00-2 2v10a2 2 0 002 2h2V6.5C5 4.29 6.29 3 8.5 3H14c0-1-1.068-2-2-2zm2.959 1.5A3 3 0 0012 0H3a3 3 0 00-3 3v10a3 3 0 003 3h2.5V6.5a3 3 0 013-3H15V3c0-.17-.014-.337-.041-.5z"
            fill="#062735"
          />
          <G fillRule="evenodd" clipRule="evenodd" fill="#062735">
            <Path d="M8.5 7a.5.5 0 01.5-.5h7a.5.5 0 010 1H9a.5.5 0 01-.5-.5zM9.5 10a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zM7.5 13a.5.5 0 01.5-.5h6a.5.5 0 010 1H8a.5.5 0 01-.5-.5zM10.5 15a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5z" />
            <Path d="M17 4H8a2 2 0 00-2 2v10a2 2 0 002 2h9a2 2 0 002-2V6a2 2 0 00-2-2zM8 3a3 3 0 00-3 3v10a3 3 0 003 3h9a3 3 0 003-3V6a3 3 0 00-3-3H8z" />
          </G>
        </Svg>
      )}
    </>
  )
}
