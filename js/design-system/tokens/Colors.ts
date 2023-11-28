import { Appearance } from 'react-native'

const colorScheme = Appearance.getColorScheme()
const isDarkMode = colorScheme === 'dark'

class Colors {
  static get darkText2() {
    return 'rgba(64, 64, 64, 1)'
  }
  static get normalGreen() {
    return 'rgba(0, 200, 31, 1)'
  }
  static get normalOrange() {
    return 'rgba(255, 121, 81, 1)'
  }
  static get transparent() {
    return 'rgba(0, 0, 0, 0)'
  }
  static get darkText() {
    return 'rgba(6, 39, 53, 1)'
  }
  static get normalBlue() {
    return 'rgba(125, 216, 255, 1)'
  }
  static get lightBlue() {
    return 'rgba(244, 252, 255, 1)'
  }
  static get greyForInput() {
    return 'rgba(243, 243, 243, 1)'
  }
  static get greyButtonBackground() {
    return 'rgba(251, 251, 251, 1)'
  }
  static get greySuperLight() {
    return 'rgba(216, 216, 216, 1)'
  }
  static get greyInactive() {
    return 'rgba(155, 155, 155, 1)'
  }
  static get darkBlue() {
    return 'rgba(6, 39, 53, 1)'
  }
  static get white() {
    return 'rgb(255, 255, 255)'
  }
  static get white80() {
    return 'rgba(255, 255, 255, 0.8)'
  }
  static get white60() {
    return 'rgba(255, 255, 255, 0.6)'
  }
  static get white30() {
    return 'rgba(255, 255, 255, 0.3)'
  }
  static get white20() {
    return 'rgba(255, 255, 255, 0.2)'
  }
  static get white10() {
    return 'rgba(255, 255, 255, 0.1)'
  }
  static get white5() {
    return 'rgba(255, 255, 255, 0.05)'
  }
  static get classicBlue() {
    return 'rgb(3, 37, 85)'
  }
  static get classicBlue80() {
    return 'rgba(3, 37, 85, 0.8)'
  }
  static get classicBlue60() {
    return 'rgba(3, 37, 85, 0.6)'
  }
  static get classicBlue30() {
    return 'rgba(3, 37, 85, 0.3)'
  }
  static get classicBlue20() {
    return 'rgba(3, 37, 85, 0.2)'
  }
  static get classicBlue10() {
    return 'rgba(3, 37, 85, 0.1)'
  }
  static get classicBlue5() {
    return 'rgba(3, 37, 85, 0.05)'
  }
  //   static get darkBlue() {
  //     return 'rgb(25, 24, 65)'
  //   }
  static get darkBlue80() {
    return 'rgba(25, 24, 65, 0.8)'
  }
  static get darkBlue60() {
    return isDarkMode ? this.white10 : 'rgba(25, 24, 65, 0.6)'
  }
  static get darkBlue30() {
    return 'rgba(25, 24, 65, 0.3)'
  }
  static get darkBlue20() {
    return 'rgba(25, 24, 65, 0.2)'
  }
  static get darkBlue10() {
    return 'rgba(25, 24, 65, 0.1)'
  }
  static get darkBlue5() {
    return 'rgba(25, 24, 65, 0.05)'
  }
  static get red() {
    return 'rgb(255, 38, 38)'
  }
  static get red80() {
    return 'rgba(255, 38, 38, 0.8)'
  }
  static get red60() {
    return 'rgba(255, 38, 38, 0.6)'
  }
  static get red30() {
    return 'rgba(255, 38, 38, 0.3)'
  }
  static get red20() {
    return 'rgba(255, 38, 38, 0.2)'
  }
  static get red10() {
    return 'rgba(255, 38, 38, 0.1)'
  }
  static get red5() {
    return 'rgba(255, 38, 38, 0.05)'
  }
  static get lightGreen() {
    return 'rgb(68, 219, 94)'
  }
  static get lightGreen80() {
    return 'rgba(68, 219, 94, 0.8)'
  }
  static get lightGreen60() {
    return 'rgba(68, 219, 94, 0.6)'
  }
  static get lightGreen30() {
    return 'rgba(68, 219, 94, 0.3)'
  }
  static get lightGreen20() {
    return 'rgba(68, 219, 94, 0.2)'
  }
  static get lightGreen10() {
    return 'rgba(68, 219, 94, 0.1)'
  }
  static get lightGreen5() {
    return 'rgba(68, 219, 94, 0.05)'
  }
  static get darkGreen() {
    return 'rgb(0, 112, 19)'
  }
  static get darkGreen80() {
    return 'rgba(0, 112, 19, 0.8)'
  }
  static get darkGreen60() {
    return 'rgba(0, 112, 19, 0.6)'
  }
  static get darkGreen30() {
    return 'rgba(0, 112, 19, 0.3)'
  }
  static get darkGreen20() {
    return 'rgba(0, 112, 19, 0.2)'
  }
  static get darkGreen10() {
    return 'rgba(0, 112, 19, 0.1)'
  }
  static get darkGreen5() {
    return 'rgba(0, 112, 19, 0.05)'
  }
  static get darkRed() {
    return 'rgb(118, 13, 0)'
  }
  static get darkRed80() {
    return 'rgba(118, 13, 0, 0.8)'
  }
  static get darkRed60() {
    return 'rgba(118, 13, 0, 0.6)'
  }
  static get darkRed30() {
    return 'rgba(118, 13, 0, 0.3)'
  }
  static get darkRed20() {
    return 'rgba(118, 13, 0, 0.2)'
  }
  static get darkRed10() {
    return 'rgba(118, 13, 0, 0.1)'
  }
  static get darkRed5() {
    return 'rgba(118, 13, 0, 0.05)'
  }
  static get golden() {
    return 'rgb(248, 167, 70)'
  }
  static get golden80() {
    return 'rgba(248, 167, 70, 0.8)'
  }
  static get golden60() {
    return 'rgba(248, 167, 70, 0.6)'
  }
  static get golden30() {
    return 'rgba(248, 167, 70, 0.3)'
  }
  static get golden20() {
    return 'rgba(248, 167, 70, 0.2)'
  }
  static get golden10() {
    return 'rgba(248, 167, 70, 0.1)'
  }
  static get golden5() {
    return 'rgba(248, 167, 70, 0.05)'
  }
  static get teal() {
    return 'rgb(90, 234, 178)'
  }
  static get teal80() {
    return 'rgba(90, 234, 178, 0.8)'
  }
  static get teal60() {
    return 'rgba(90, 234, 178, 0.6)'
  }
  static get teal30() {
    return 'rgba(90, 234, 178, 0.3)'
  }
  static get teal20() {
    return 'rgba(90, 234, 178, 0.2)'
  }
  static get teal10() {
    return 'rgba(90, 234, 178, 0.1)'
  }
  static get teal5() {
    return 'rgba(90, 234, 178, 0.05)'
  }
  static get orange() {
    return 'rgb(255, 120, 70)'
  }
  static get orange80() {
    return 'rgba(255, 120, 70, 0.8)'
  }
  static get orange60() {
    return 'rgba(255, 120, 70, 0.6)'
  }
  static get orange30() {
    return 'rgba(255, 120, 70, 0.3)'
  }
  static get orange20() {
    return 'rgba(255, 120, 70, 0.2)'
  }
  static get orange10() {
    return 'rgba(255, 120, 70, 0.1)'
  }
  static get orange5() {
    return 'rgba(255, 120, 70, 0.05)'
  }
}

export { Colors }
