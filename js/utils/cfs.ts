import { PixelRatio } from 'react-native'

import rem, { remCalc } from './rem'

export const cfsAbsolute =
  (value: number, round = true): ((props: any) => number) =>
  (props): number => {
    const cfsValue = props.theme.cfs ? props.theme.cfs(value) : value
    return round ? PixelRatio.roundToNearestPixel(cfsValue) : cfsValue
  }
export const cfs = (value: number, round = true): ((props: any) => number) => cfsAbsolute(rem(value, round), round)

export const spacingAbsolute = (value: number) => (props: any) => props.theme.cfs ? props.theme.cfs(value) : value

export const spacing = (value: number) => spacingAbsolute(remCalc(value))
