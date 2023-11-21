import styled from 'styled-components/native'

import { BlackFont, BoldFont, ExtraBoldFont, MediumFont, RegularFont } from './fonts'
import { Colors } from '../Colors'
import { cfs, spacing } from 'utils/cfs'

export {
  BlackFont,
  BoldFont,
  ExtraBoldFont,
  ItalicFont,
  MediumFont,
  MonoBoldFont,
  MonoMediumFont,
  MonoRegularFont,
  MonoThinFont,
  RegularFont,
} from './fonts'

export const Steps = styled.Text`
  ${MediumFont};

  color: ${Colors.white};
  font-size: ${cfs(60)}px;
  letter-spacing: ${spacing(-0.8)}px;
  line-height: ${cfs(60 * 1.2)}px;
`

export const CardL = styled.Text`
  ${BlackFont};

  color: ${Colors.white};
  font-size: ${cfs(56)}px;
  letter-spacing: ${spacing(0)}px;
  line-height: ${cfs(56 * 1.2)}px;
`

export const CardM = styled.Text`
  ${ExtraBoldFont};

  color: ${Colors.white};
  font-size: ${cfs(48)}px;
  letter-spacing: ${spacing(0)}px;
  line-height: ${cfs(48 * 1.1)}px;
`

export const MainHeadline = styled.Text`
  ${BoldFont};

  color: ${Colors.white};
  font-size: ${cfs(48)}px;
  letter-spacing: ${spacing(-0.6)}px;
  line-height: ${cfs(48 * 1.3)}px;
`

export const SecondaryHeadline = styled.Text`
  ${BoldFont};

  color: ${Colors.white};
  font-size: ${cfs(36)}px;
  letter-spacing: ${spacing(-0.4)}px;
  line-height: ${cfs(36 * 1.3)}px;
`

export const TitleL = styled.Text`
  ${BoldFont};

  color: ${Colors.white};
  font-size: ${cfs(28)}px;
  line-height: ${cfs(28 * 1.3)}px;
  letter-spacing: ${spacing(-0.2)}px;
`

/**
 * @deprecated Legacy naming, please use TitleL instead
 */
export const Title1 = TitleL

export const TitleM = styled.Text`
  ${BoldFont};

  color: ${Colors.white};
  font-size: ${cfs(24)}px;
  line-height: ${cfs(24 * 1.3)}px;
  letter-spacing: ${spacing(-0.2)}px;
`

/**
 * @deprecated Legacy naming, please use TitleM instead
 */
export const Title2 = TitleM

export const TitleS = styled.Text`
  ${BoldFont};

  color: ${Colors.white};
  font-size: ${cfs(20)}px;
  line-height: ${cfs(20 * 1.4)}px;
  letter-spacing: ${spacing(-0.2)}px;
`

/**
 * @deprecated Legacy naming, please use TitleS instead
 */
export const Title3 = TitleS

export const BodyL = styled.Text`
  ${RegularFont};

  color: ${Colors.white};
  font-size: ${cfs(20)}px;
  line-height: ${cfs(20 * 1.4)}px;
  letter-spacing: ${spacing(-0.2)}px;
`

export const BodyM = styled.Text`
  ${RegularFont};

  color: ${Colors.white};
  font-size: ${cfs(16)}px;
  line-height: ${cfs(16 * 1.4)}px;
  letter-spacing: ${spacing(-0.2)}px;
`

export const BodyS = styled.Text`
  ${RegularFont};

  color: ${Colors.white};
  font-size: ${cfs(14)}px;
  line-height: ${cfs(14 * 1.4)}px;
  letter-spacing: ${spacing(-0.2)}px;
`

export const CalloutL = styled.Text`
  ${BoldFont};

  color: ${Colors.white};
  font-size: ${cfs(16)}px;
  line-height: ${cfs(16 * 1.4)}px;
  letter-spacing: ${spacing(-0.2)}px;
`

export const CalloutM = styled.Text`
  ${BoldFont};

  color: ${Colors.white};
  font-size: ${cfs(12)}px;
  line-height: ${cfs(12 * 1.4)}px;
  letter-spacing: ${spacing(0)}px;
`

export const Footnote = styled.Text`
  ${RegularFont};

  color: ${Colors.white};
  font-size: ${cfs(12)}px;
  line-height: ${cfs(12 * 1.4)}px;
  letter-spacing: ${spacing(0)}px;
  color: '#9B9B9B';
`

export const FootnoteCaps = styled.Text`
  ${MediumFont};

  color: ${Colors.white};
  font-size: ${cfs(12)}px;
  line-height: ${cfs(12 * 1.4)}px;
  letter-spacing: ${spacing(0)}px;
  text-transform: uppercase;
`