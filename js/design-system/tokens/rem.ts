import { Dimensions, PixelRatio, Platform } from 'react-native'

const { width: windowWidth } = Dimensions.get('window')

const width =
  Platform.select({
    ios: windowWidth,
    android: windowWidth,
    web: 414, // Design team usually design for 414 width
  }) ?? 0

let base = 0.8

if (width > 719) {
  base = 1.2
} else if (width > 539) {
  base = 1.1
} else if (width > 413) {
  base = 1
} else if (width > 374) {
  base = 0.9
} else if (width > 319) {
  base = 0.8
}

export default (unit: number, round = true): number =>
  round ? PixelRatio.roundToNearestPixel(base * unit) : base * unit
export const remCalc = (unit: number): number => base * unit
