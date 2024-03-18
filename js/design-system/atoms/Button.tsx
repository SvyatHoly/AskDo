import React, { useEffect } from 'react'
import { TouchableOpacity, ViewProps } from 'react-native'
import styled, { ThemeProvider, css } from 'styled-components/native'

import { ButtonColor, ButtonLoadingType, ButtonSize, ButtonType } from './consts'
import { Colors } from '../tokens/Colors'
import { IconPosition } from '../tokens/icons/consts'
import * as TextStyles from '../tokens/Text'
import rem from '../tokens/rem'

export interface Props extends Pick<ViewProps, 'style'> {
  testID?: string
  children?: React.ReactNode
  type?: ButtonType
  size?: ButtonSize
  isShadow?: boolean
  color?: ButtonColor
  backgroundColor?: string
  icon?: React.ReactNode
  iconPosition?: IconPosition
  debounceMs?: number
  loading?: boolean
  loadingType?: ButtonLoadingType
  disabled?: boolean
  onPress(): void
}

export interface Theme {
  button: Pick<Props, 'type' | 'size' | 'color' | 'disabled' | 'backgroundColor' | 'isShadow'>
}

const Button: React.FC<Props> = (props: Props) => {
  const {
    testID,
    children,
    type = ButtonType.PRIMARY,
    size = ButtonSize.BIG,
    isShadow = false,
    color = ButtonColor.BLUE,
    backgroundColor,
    icon,
    iconPosition = IconPosition.LEFT,
    disabled = false,
    loading = false,
    onPress,
    debounceMs = 0,
    style,
  } = props

  const timerId = React.useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current)
      }
    }
  }, [])

  const Title = size === ButtonSize.SMALL ? SmallTitle : BigTitle

  const iconContent = icon ? <IconContainer iconPosition={iconPosition}>{icon}</IconContainer> : null

  const loadingSize = size === ButtonSize.SMALL ? rem(20) : rem(30)
  return (
    <ThemeProvider theme={{ button: { testID, type, size, color, disabled, backgroundColor, isShadow } }}>
      <ButtonContainer
        style={style}
        testID={testID}
        disabled={disabled}
        onPress={() => {
          if (!debounceMs) {
            return onPress()
          }

          if (timerId.current) {
            clearTimeout(timerId.current)
          }

          timerId.current = setTimeout(onPress, debounceMs)
        }}
        opacity={getOpacity(props)}>
        <Layout>
          {iconPosition === IconPosition.LEFT && iconContent}
          {loading ? (
            <Loading.Container>
              {/* <Loading.Animation size={loadingSize} source={getLoaderJson()} /> */}
            </Loading.Container>
          ) : null}
          <Title opacity={loading ? 0 : 1}>{children}</Title>
          {iconPosition === IconPosition.RIGHT && iconContent}
        </Layout>
      </ButtonContainer>
    </ThemeProvider>
  )

  function getOpacity({ disabled }: Props) {
    if (disabled) {
      return 0.6
    }

    return 1
  }
}

const getTextColor = (props: Props) => {
  const { color, type, disabled } = props

  switch (color) {
    case ButtonColor.BLUE:
      return disabled ? Colors.darkBlue60 : Colors.darkBlue
    case ButtonColor.GREY:
      return disabled ? Colors.grayButtonBackground : Colors.grayButtonBackground
    default:
      return Colors.red
  }
}

const getBackgroundColor = (props: Pick<Props, 'type' | 'size' | 'color' | 'disabled' | 'backgroundColor'>) => {
  const { color, type, disabled, backgroundColor } = props
  if (backgroundColor) {
    return backgroundColor
  }
  switch (color) {
    case ButtonColor.BLUE:
      if (type === ButtonType.SECONDARY) {
        return disabled ? Colors.lightBlue : Colors.normalBlue
      }
      return disabled ? Colors.lightBlue : Colors.normalBlue

    case ButtonColor.GREY:
      if (type === ButtonType.SECONDARY) {
        return disabled ? Colors.grayDark50 : Colors.grayDark
      }
      return disabled ? Colors.grayDark50 : Colors.grayDark
  }
}

const ButtonContainer = styled(TouchableOpacity).attrs({ activeOpacity: 0.8 })<{ opacity: number }>`
  opacity: ${(props) => props.opacity};
`

const Layout = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  border-radius: ${rem(16)}px;
  background-color: ${(props) => getBackgroundColor(props.theme.button)};
  ${({ theme }: { theme: Theme }) => {
    let styles = ''

    if (theme.button.size !== 'small') {
      // Use template literals to accumulate styles.
      styles += `
    height: ${rem(50)}px;
    min-width: ${rem(50)}px;
    /* padding-horizontal: ${rem(20)}px; */
  `
    }
    if (theme.button.isShadow) {
      // Continue adding to the styles string.
      styles += `
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  `
    }

    // Return the accumulated styles.
    return css`
      ${styles}
    `
  }}
`

const SmallTitle = styled(TextStyles.CalloutM).attrs({
  numberOfLines: 1,
})<{ opacity: number }>`
  opacity: ${(props) => props.opacity};
  color: ${(props) => getTextColor(props.theme.button)};
`
const BigTitle = styled(TextStyles.CalloutL).attrs({
  numberOfLines: 1,
})<{ opacity: number }>`
  opacity: ${(props) => props.opacity};
  color: ${(props) => getTextColor(props.theme.button)};
`

const IconContainer = styled.View<{ iconPosition: IconPosition }>`
  flex-direction: column;
`

const Loading = {
  Container: styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  `,
}

export { Button }
