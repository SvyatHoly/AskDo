import React, { useEffect, useState } from 'react'
import { Platform, ViewProps } from 'react-native'
import styled from 'styled-components/native'

import { NAV_BAR_HEIGHT, NAV_BAR_SMALL_HEIGHT } from './hooks/useNavBarInset'
import { useWrapSafeAreaInsets } from './hooks/useWrapSafeAreaInsets'
import { BackIcon } from 'shared/icons/BackIcon'
import { ThreeDotsIcon } from 'shared/icons/ThreeDotsIcon'
import { CloseIcon } from 'shared/icons/CloseIcon'

import * as TextStyles from '../../tokens/Text'
import rem from '../../tokens/rem'
import { TouchableOpacity } from 'react-native-gesture-handler'

export enum LeftButtonType {
  BACK,
  CLOSE,
  NONE,
}

export enum RightButtonType {
  DOTS,
  CROSS,
  NONE,
}

export enum NavigationBarSize {
  NORMAL = 'NORMAL',
  SMALL = 'SMALL',
}

interface Props extends Pick<ViewProps, 'style'> {
  title?: string | React.ReactNode
  leftButtonType?: LeftButtonType | null
  rightButtonType?: RightButtonType | null
  leftComponent?: React.ReactNode
  onLeftButtonPress?: () => void
  onRightButtonPress?: () => void
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
    const { onLeftButtonPress, leftButtonType } = props
    if (leftButtonType === LeftButtonType.NONE) {
      return <Spacer />
    }

    let icon
    switch (leftButtonType) {
      case LeftButtonType.BACK:
        icon = <BackIcon />
        break
      default:
        break
    }

    return (
      <HeaderButton onPress={onLeftButtonPress} onLayout={handleLeftButtonLayout}>
        {icon}
      </HeaderButton>
    )
  }

  function renderRightButtonItem() {
    const { onRightButtonPress, rightButtonType } = props
    if (rightButtonType === RightButtonType.NONE) {
      return <Spacer />
    }
    let icon
    switch (rightButtonType) {
      case RightButtonType.DOTS:
        icon = <ThreeDotsIcon />
        break
      case RightButtonType.CROSS:
        icon = <CloseIcon />
        break
      default:
        break
    }
    return (
      <HeaderButton onPress={onRightButtonPress} onLayout={handleRightButtonLayout}>
        {icon}
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

const Spacer = styled.View`
  width: ${rem(40)}px;
  height: ${rem(40)}px;
`

export default NavigationBar
