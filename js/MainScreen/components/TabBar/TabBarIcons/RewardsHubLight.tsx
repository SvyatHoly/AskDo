import * as React from 'react'
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg'
import { rem } from 'sweatcoin-design-system'

export function RewardsHubLight() {
  return (
    <Svg width={rem(48)} height={rem(48)} viewBox="0 0 48 48" fill="none">
      <Path
        fill="#707A8C"
        d="M26.18 14.59c-.35.219-.6.583-.688.984-.046.195-.042.397-.041.596v1.387h1.35c.164 0 .33.006.492-.017.314-.04.614-.176.85-.386.27-.24.45-.577.506-.933.051-.35.03-.726-.145-1.042-.21-.4-.602-.693-1.04-.796a1.68 1.68 0 0 0-1.285.207Zm-5.546-.015c-.39.234-.676.646-.73 1.1-.032.331 0 .676.146.98.198.426.6.75 1.058.854.232.061.474.046.712.049h1.294v-1.605c0-.29-.072-.582-.219-.833a1.56 1.56 0 0 0-.968-.73 1.696 1.696 0 0 0-1.293.185m-1.73-1.621a4.001 4.001 0 0 1 2.503-.952 3.948 3.948 0 0 1 2.875 1.126 3.953 3.953 0 0 1 2.82-1.127 4 4 0 0 1 2.789 1.164 3.79 3.79 0 0 1 1.09 2.236c.08.73-.011 1.483-.31 2.158 1.202-.004 2.403 0 3.605-.002.26-.001.519.04.764.124.754.254 1.327.941 1.48 1.717.058.261.043.53.045.796-.001.265.002.53-.001.796a2.31 2.31 0 0 1-.432 1.337c-.239.331-.577.587-.957.736-.069.026-.138.058-.214.052-7.136-.001-14.271.002-21.407 0a2.09 2.09 0 0 1-.934-.565c-.402-.412-.614-.989-.62-1.562v-1.176a2.307 2.307 0 0 1 .497-1.439c.414-.521 1.078-.812 1.74-.815 1.217 0 2.436-.002 3.655 0a4.24 4.24 0 0 1-.294-2.267c.129-.905.61-1.748 1.306-2.337M14.224 32.724V25c2.965.003 5.928-.003 8.892.003-.003 3.333 0 6.666-.002 10h-6.057c-.398-.005-.805.027-1.192-.083a2.18 2.18 0 0 1-1.217-.83 2.333 2.333 0 0 1-.424-1.367M25.45 25.004c2.705-.008 5.41-.001 8.116-.003.259.001.518-.004.778.003-.004 2.563 0 5.127-.002 7.69.004.414-.09.833-.295 1.195-.218.39-.561.707-.967.894a2.452 2.452 0 0 1-1.076.22c-2.184 0-4.369.001-6.553-.001-.002-3.333.003-6.666-.002-9.999"
      />
      <Path
        fill="url(#a)"
        d="M7.575 34.996c.122-.596.183-.895.284-.956a.271.271 0 0 1 .282 0c.1.061.162.36.284.956l.208 1.019c.083.406.125.609.225.772.089.144.21.266.355.355.163.1.366.142.772.225l1.019.208c.597.122.895.183.956.284a.271.271 0 0 1 0 .282c-.061.1-.36.162-.956.284l-1.019.208c-.406.083-.609.124-.772.225-.144.089-.266.21-.355.355-.1.163-.142.366-.225.772l-.208 1.019c-.122.596-.183.895-.284.956a.271.271 0 0 1-.282 0c-.1-.061-.162-.36-.284-.956l-.208-1.019c-.083-.406-.125-.609-.225-.772a1.085 1.085 0 0 0-.355-.355c-.163-.1-.366-.142-.772-.225l-1.019-.208c-.596-.122-.895-.183-.956-.284a.27.27 0 0 1 0-.282c.061-.1.36-.162.956-.284l1.019-.208c.406-.083.609-.124.772-.225.144-.089.266-.21.355-.355.1-.163.142-.366.225-.772l.208-1.019Z"
      />
      <Path
        fill="url(#b)"
        d="M41.363 7.495c.183-.896.274-1.343.425-1.436.13-.079.294-.079.424 0 .15.093.242.54.425 1.436l.313 1.527c.124.609.186.914.337 1.159.133.216.316.399.532.532.245.15.55.213 1.159.337l1.527.313c.896.183 1.343.274 1.435.425.08.13.08.294 0 .424-.092.15-.54.242-1.435.425l-1.527.313c-.609.124-.913.186-1.159.337a1.625 1.625 0 0 0-.532.532c-.15.245-.213.55-.337 1.159l-.313 1.527c-.183.896-.274 1.343-.425 1.436a.407.407 0 0 1-.424 0c-.15-.093-.242-.54-.425-1.436l-.313-1.527c-.124-.609-.186-.913-.337-1.159a1.625 1.625 0 0 0-.532-.532c-.245-.15-.55-.213-1.159-.337l-1.527-.313c-.896-.183-1.343-.274-1.435-.425a.407.407 0 0 1 0-.424c.092-.15.54-.242 1.435-.425l1.527-.313c.609-.124.913-.186 1.159-.337.216-.133.399-.316.532-.532.15-.245.213-.55.337-1.159l.313-1.527Z"
      />
      <Defs>
        <LinearGradient id="a" x1={8} x2={8} y1={34} y2={42} gradientUnits="userSpaceOnUse">
          <Stop stopColor="#E767A0" />
          <Stop offset={1} stopColor="#9561E6" />
        </LinearGradient>
        <LinearGradient id="b" x1={42} x2={42} y1={6} y2={18} gradientUnits="userSpaceOnUse">
          <Stop stopColor="#E767A0" />
          <Stop offset={1} stopColor="#9561E6" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}
