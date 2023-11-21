import React from 'react'
import Svg, { Defs, G, LinearGradient, Path, Rect, Stop } from 'react-native-svg'

export const PathDark = () => {
  return (
    <Svg viewBox="0 0 48 48">
      <Defs>
        <LinearGradient id="a" x1="50%" x2="50%" y1="0%" y2="100%">
          <Stop offset="0%" stopColor="#FFF" stopOpacity={0.698} />
          <Stop offset="100%" stopColor="#FFF" stopOpacity={0.799} />
        </LinearGradient>
        <LinearGradient id="b" x1="50%" x2="50%" y1="0%" y2="100%">
          <Stop offset="0%" stopColor="#B4BECC" />
          <Stop offset="100%" stopColor="#CCD3DC" />
        </LinearGradient>
      </Defs>
      <G fill="none" fillRule="evenodd">
        <Path
          fill="url(#a)"
          fillRule="nonzero"
          d="m9.686 1.145-9 7.84A2 2 0 0 0 0 10.493V21a2 2 0 0 0 2 2h6a1 1 0 0 0 1-1v-5a2 2 0 1 1 4 0v5a1 1 0 0 0 1 1h6a2 2 0 0 0 2-2V10.493a2 2 0 0 0-.686-1.508l-9-7.84a2 2 0 0 0-2.628 0Z"
          transform="translate(13 12)"
        />
        <G transform="translate(25 12)">
          <Rect width={21} height={12} fill="url(#b)" fillRule="nonzero" rx={6} />
          <Path
            fill="#032555"
            fillRule="nonzero"
            d="M3.439 8.447v-5.09h2.038c.374 0 .687.055.937.166.25.111.438.265.564.462.126.196.19.421.19.677a1.03 1.03 0 0 1-.447.892 1.345 1.345 0 0 1-.473.201v.05a1.162 1.162 0 0 1 .96.59c.105.18.158.395.158.645 0 .27-.067.512-.201.724-.133.21-.33.377-.59.5-.26.122-.58.183-.961.183H3.439Zm1.076-.88h.877c.3 0 .52-.057.657-.171a.575.575 0 0 0 .206-.462.684.684 0 0 0-.102-.373.692.692 0 0 0-.29-.254.996.996 0 0 0-.446-.092h-.902v1.352Zm0-2.08h.798a.95.95 0 0 0 .393-.077.654.654 0 0 0 .273-.224.583.583 0 0 0 .102-.346.559.559 0 0 0-.196-.444c-.13-.113-.314-.17-.552-.17h-.818v1.26Zm5.077 3.035c-.393 0-.731-.08-1.015-.239a1.634 1.634 0 0 1-.65-.68c-.153-.296-.23-.645-.23-1.047 0-.393.077-.738.23-1.034a1.69 1.69 0 0 1 .643-.694c.278-.166.605-.249.98-.249.251 0 .486.041.703.122.219.08.41.2.572.36.164.161.291.364.383.607.09.242.136.526.136.85v.291H8.12v-.656h2.227a.811.811 0 0 0-.1-.405.712.712 0 0 0-.275-.276.787.787 0 0 0-.405-.102.815.815 0 0 0-.428.112.784.784 0 0 0-.288.296.835.835 0 0 0-.107.41v.624c0 .189.035.352.104.49a.765.765 0 0 0 .301.318c.13.074.283.111.46.111a1 1 0 0 0 .323-.05.649.649 0 0 0 .41-.393l.98.066c-.05.235-.152.44-.306.616-.152.174-.35.31-.592.408a2.23 2.23 0 0 1-.832.144Zm4.28-3.893v.796h-2.3v-.796h2.3Zm-1.778-.915h1.059v3.56c0 .098.015.174.044.229.03.053.072.09.125.112a.512.512 0 0 0 .189.032c.05 0 .1-.004.149-.012l.114-.023.167.788a2.976 2.976 0 0 1-.224.057 1.794 1.794 0 0 1-.35.043 1.61 1.61 0 0 1-.672-.102.937.937 0 0 1-.445-.363c-.106-.164-.158-.371-.156-.622V3.714Zm3.36 4.805c-.243 0-.46-.042-.65-.126a1.048 1.048 0 0 1-.453-.38 1.14 1.14 0 0 1-.164-.632c0-.212.039-.39.117-.534a.946.946 0 0 1 .318-.348c.134-.088.287-.155.457-.2.173-.044.353-.076.542-.094.222-.023.401-.045.537-.064a.761.761 0 0 0 .296-.095.208.208 0 0 0 .092-.184v-.015c0-.157-.05-.279-.15-.365-.097-.086-.236-.13-.417-.13-.19 0-.342.043-.455.127a.583.583 0 0 0-.223.314l-.98-.08a1.33 1.33 0 0 1 .293-.602c.146-.17.334-.301.565-.392.232-.093.5-.14.805-.14.212 0 .415.025.61.075.195.05.368.127.519.231a1.124 1.124 0 0 1 .492.987v2.575H16.6v-.53h-.03c-.062.12-.144.225-.246.317-.103.09-.226.16-.37.21a1.53 1.53 0 0 1-.5.075Zm.304-.73a.89.89 0 0 0 .413-.092.73.73 0 0 0 .28-.254.653.653 0 0 0 .102-.36v-.405a.567.567 0 0 1-.136.06c-.057.016-.12.031-.192.046a9.601 9.601 0 0 1-.407.065 1.31 1.31 0 0 0-.326.087.521.521 0 0 0-.216.162.394.394 0 0 0-.077.248c0 .144.052.255.156.33.106.075.24.113.403.113Z"
          />
          <Rect width={21} height={12} stroke="#032555" rx={6} />
        </G>
      </G>
    </Svg>
  )
}