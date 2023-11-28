import { Platform } from 'react-native'
import { css } from 'styled-components/native'

export const RegularFont =
  Platform.OS === 'web'
    ? css`
        font-family: 'Inter';
        font-weight: 400;
        font-style: normal;
      `
    : css`
        font-family: 'Inter';
        font-weight: 500;
      `

export const MediumFont =
  Platform.OS === 'web'
    ? css`
        font-family: 'Inter';
        font-weight: 500;
        font-style: normal;
      `
    : css`
        font-family: 'Inter-Medium';
      `

export const MediumBold =
  Platform.OS === 'web'
    ? css`
        font-family: 'Inter';
        font-weight: 700;
        font-style: normal;
      `
    : css`
        font-family: 'Inter-Bold';
        font-weight: 600;
      `

export const BoldFont =
  Platform.OS === 'web'
    ? css`
        font-family: 'Inter';
        font-weight: 700;
        font-style: normal;
      `
    : css`
        font-family: 'Inter';
        font-weight: 700;
      `

export const ExtraBoldFont =
  Platform.OS === 'web'
    ? css`
        font-family: 'Inter';
        font-weight: 800;
        font-style: normal;
      `
    : css`
        font-family: 'Inter-ExtraBold';
      `

export const BlackFont =
  Platform.OS === 'web'
    ? css`
        font-family: 'Inter';
        font-weight: 900;
        font-style: normal;
      `
    : css`
        font-family: 'Inter-Black';
      `

export const ItalicFont =
  Platform.OS === 'web'
    ? css`
        font-family: 'Inter';
        font-weight: 400;
        font-style: italic;
      `
    : css`
        font-family: 'Inter-Italic';
      `

export const MonoThinFont = css`
  font-family: 'RobotoMono-Thin';
`

export const MonoRegularFont = css`
  font-family: 'RobotoMono-Regular';
`

export const MonoMediumFont = css`
  font-family: 'RobotoMono-Medium';
`

export const MonoBoldFont = css`
  font-family: 'RobotoMono-Bold';
`
