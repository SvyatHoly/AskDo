import React, { useEffect, useState } from 'react'
import { I18nManager, Platform, ViewProps } from 'react-native'
import styled from 'styled-components/native'

import { NAV_BAR_HEIGHT, NAV_BAR_SMALL_HEIGHT } from './hooks/useNavBarInset'
import { useWrapSafeAreaInsets } from './hooks/useWrapSafeAreaInsets'
import { Colors } from '../../tokens/Colors'
import { BackIcon } from 'shared/icons/BackIcon'
import { ThreeDotsIcon } from 'shared/icons/ThreeDotsIcon'

import * as TextStyles from '../../tokens/Text'
import rem from '../../tokens/rem'
import { TouchableOpacity } from 'react-native-gesture-handler'

export enum LeftButtonType {
  BACK = 'BACK',
  CLOSE = 'CLOSE',
}

export enum NavigationBarSize {
  NORMAL = 'NORMAL',
  SMALL = 'SMALL',
}

interface Props extends Pick<ViewProps, 'style'> {
  title?: string | React.ReactNode
  leftButtonType?: LeftButtonType | null
  leftComponent?: React.ReactNode
  onLeftButtonPress?: () => void
  rightComponent?: React.ReactNode
  ignoreSafeArea?: boolean
  size?: NavigationBarSize
  testID?: string
}

const defaultTitleMargin = rem(80)

const NavigationBar = (props: Props) => {
  const insets = useWrapSafeAreaInsets()
  const ignoreSafeArea = props.ignoreSafeArea ?? false
  const isIOS = Platform.OS === 'ios'
  const [titleMargin, setTitleMargin] = useState(defaultTitleMargin)
  const [leftButtonWidth, setLeftButtonWidth] = useState(-1)
  const [rightButtonWidth, setRightButtonWidth] = useState(-1)

  const handleLeftButtonLayout = ({ nativeEvent }: any) => setLeftButtonWidth(nativeEvent.layout.width)
  const handleRightButtonLayout = ({ nativeEvent }: any) => setRightButtonWidth(nativeEvent.layout.width)

  useEffect(() => {
    if (leftButtonWidth > -1 && rightButtonWidth > -1) {
      const newTitleMargin = Math.max(leftButtonWidth, rightButtonWidth) + rem(48)
      if (newTitleMargin !== titleMargin) {
        setTitleMargin(newTitleMargin)
      }
    }
  }, [leftButtonWidth, rightButtonWidth, titleMargin])

  return (
    <Container
      height={props.size == NavigationBarSize.SMALL ? NAV_BAR_SMALL_HEIGHT : NAV_BAR_HEIGHT}
      style={[props.style, { marginTop: ignoreSafeArea ? 0 : insets.top }]}
      testID={props.testID}>
      {renderLeftButtonItem()}
      {/* <NavBarButton.Container
        testID={`navigationBarBackButton-${props.leftButtonType}`}
        onLayout={handleLeftButtonLayout}>
        {renderLeftButtonItem()}
      </NavBarButton.Container> */}
      <Title.Container titleMargin={titleMargin}>{renderTitle()}</Title.Container>
      {renderRightButtonItem()}
      {/* <NavBarButton.Container onLayout={handleRightButtonLayout}>{renderRightButtonItem()}</NavBarButton.Container> */}
    </Container>
  )

  function renderTitle() {
    const { title, size } = props
    if (typeof title !== 'string') {
      return title
    } else if (size == NavigationBarSize.SMALL) {
      return (
        <Title.LabelSmall adjustsFontSizeToFit={isIOS} minimumFontScale={0.8} allowFontScaling={false}>
          {title}
        </Title.LabelSmall>
      )
    } else {
      return (
        <Title.Label adjustsFontSizeToFit={isIOS} minimumFontScale={0.8} allowFontScaling={false}>
          {title}
        </Title.Label>
      )
    }
  }

  function renderLeftButtonItem() {
    const { onLeftButtonPress } = props
    return (
      <HeaderButton onPress={onLeftButtonPress} onLayout={handleLeftButtonLayout}>
        <BackIcon />
      </HeaderButton>
    )
  }

  function renderRightButtonItem() {
    return (
      <HeaderButton onLayout={handleRightButtonLayout}>
        <ThreeDotsIcon />
      </HeaderButton>
    )
  }
}

const Container = styled.View<{ height: number }>`
  height: ${({ height }) => height}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${rem(12)}px;
`

const Title = {
  Container: styled.View<{ titleMargin: number }>`
    position: absolute;
    start: ${({ titleMargin }) => titleMargin}px;
    end: ${({ titleMargin }) => titleMargin}px;
    height: 32px;
    justify-content: center;
  `,
  Label: styled(TextStyles.TitleS).attrs({
    numberOfLines: 1,
  })`
    text-align: center;
  `,
  LabelSmall: styled(TextStyles.CalloutL).attrs({
    numberOfLines: 1,
  })`
    text-align: center;
  `,
}

const HeaderButton = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  width: ${rem(40)}px;
  height: ${rem(40)}px;
`

export default NavigationBar
