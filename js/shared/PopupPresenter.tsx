import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { LayoutChangeEvent, LayoutRectangle, Modal, useWindowDimensions } from 'react-native'
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
  TapGestureHandler,
  TapGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler'
import Animated, {
  Layout as LayoutAnimation,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import styled from 'styled-components/native'
import { Colors } from 'design-system'

const DefaultSpringEnterConfig = {
  damping: 16,
  stiffness: 120,
  mass: 0.3,
}

const DefaultSpringExitConfig = {
  damping: 16,
  stiffness: 120,
  mass: 0.3,
}

const BottomSpringEnterConfig = {
  damping: 70,
  stiffness: 100,
  mass: 0.6,
}

const BottomSpringExitConfig = {
  damping: 16,
  stiffness: 120,
  mass: 0.3,
}

const BottomElasticSpringEnterConfig = {
  damping: 15,
  stiffness: 100,
  mass: 1,
}

const BottomElasticSpringExitConfig = {
  damping: 15,
  stiffness: 100,
  mass: 1,
}

export interface PopupPresenterType {
  close(): void
}

export interface PopupPresenterHandle {
  present(): void
  close(): void
}

type Type = 'default' | 'bottom' | 'bottom_elastic' | 'top' | 'fade-in' | 'easy-in-out'

interface ContainerProps {
  type: Type
}

interface PopupPresenterProps<CP> {
  component: React.ComponentType<PopupPresenterType & CP>
  forwardProps?: CP
  onClose?(): void
  swipeToClose?: boolean
  tapBackgroundToClose?: boolean
  autoPresent?: boolean
  presentationDelay?: number
  type?: Type
  backgroundColor?: string
}

export const PopupPresenter = forwardRef<PopupPresenterHandle, PopupPresenterProps<any>>((props, ref) => {
  useImperativeHandle(ref, () => ({ present, close }), [])

  const {
    component: PresentedComponent,
    forwardProps,
    swipeToClose = false,
    autoPresent = false,
    presentationDelay = 0,
    tapBackgroundToClose = false,
    onClose,
    type = 'default',
    backgroundColor = Colors.darkBlue60,
  } = props

  const panRef = useRef<PanGestureHandler>()
  const backgroundTapRef = useRef<PanGestureHandler>()

  const { height } = useWindowDimensions()
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(false)
  const [popupLayout, setPopupLayout] = useState<LayoutRectangle>()

  const edges: [number, number] = popupLayout ? [0, height / 2 + popupLayout.height / 2] : [0, height]
  const swipeEnabled = swipeToClose && active
  const tapEnabled = tapBackgroundToClose && active

  const opacity = useSharedValue(0)
  const backgroundStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    }
  })

  const position = useSharedValue(height)
  const layoutStyle = useAnimatedStyle(() => {
    if (type === 'fade-in') {
      return {}
    }
    return {
      transform: [{ translateY: position.value }],
    }
  })

  const { SpringEnterConfig, SpringExitConfig } = getSpringConfig(type)

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: { startY: number }) => {
      ctx.startY = position.value
    },
    onActive: (event, ctx) => {
      if (type === 'bottom' && event.velocityX >= 0) {
        return
      }

      position.value = ctx.startY + event.translationY
      opacity.value = 1 - Math.max(0, event.translationY) / edges[1]
    },
    onEnd: (evt) => {
      if (evt.translationY > 150 || evt.velocityY > 100) {
        runOnJS(handleBeforeClose)()

        opacity.value = withTiming(0)
        position.value = withSpring(edges[1], SpringExitConfig, () => {
          runOnJS(handleCloseTransitionEnd)()
        })
      } else {
        opacity.value = withTiming(1)
        position.value = withSpring(edges[0], SpringEnterConfig)
      }
    },
  })

  useEffect(() => {
    if (!visible && autoPresent) {
      setTimeout(() => {
        setVisible(true)
      }, presentationDelay)
    }
  }, [autoPresent, presentationDelay])

  useEffect(() => {
    if (active && visible) {
      return
    }

    if (visible && popupLayout) {
      setActive(true)
      opacity.value = withTiming(1)

      position.value = edges[1]
      position.value = withSpring(edges[0], SpringEnterConfig)
    }
  }, [visible, popupLayout])

  return (
    <Modal statusBarTranslucent={true} transparent={true} visible={visible}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PanGestureHandler ref={backgroundTapRef} enabled={swipeToClose && active} onGestureEvent={gestureHandler}>
          <BackgroundSwipeContainer>
            <TapGestureHandler
              enabled={tapEnabled}
              waitFor={[panRef, backgroundTapRef]}
              onHandlerStateChange={handleBackgroundTap}>
              <Background style={backgroundStyle} backgroundColor={backgroundColor} />
            </TapGestureHandler>
          </BackgroundSwipeContainer>
        </PanGestureHandler>
        <PanGestureHandler ref={panRef} enabled={swipeEnabled} onGestureEvent={gestureHandler}>
          <Container type={type} pointerEvents="box-none">
            <Layout
              style={layoutStyle}
              layout={LayoutAnimation.springify()}
              onLayout={handleLayoutChange}
              pointerEvents="box-none">
              <PresentedComponent {...forwardProps} close={close} />
            </Layout>
          </Container>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </Modal>
  )

  function handleBackgroundTap(event: TapGestureHandlerStateChangeEvent) {
    if (event.nativeEvent.state === State.ACTIVE) {
      close()
    }
  }

  function present() {
    setVisible(true)
  }

  function close() {
    setActive(false)
    opacity.value = withTiming(0)
    position.value = withTiming(edges[1], undefined, () => {
      runOnJS(handleCloseTransitionEnd)()
    })
  }

  function handleBeforeClose() {
    setActive(false)
  }

  function handleCloseTransitionEnd() {
    setVisible(false)
    onClose?.()
  }

  function handleLayoutChange(event: LayoutChangeEvent) {
    setPopupLayout(event.nativeEvent.layout)
  }

  function getSpringConfig(type: Type) {
    if (type === 'bottom') {
      return {
        SpringEnterConfig: BottomSpringEnterConfig,
        SpringExitConfig: BottomSpringExitConfig,
      }
    } else if (type === 'bottom_elastic') {
      return {
        SpringEnterConfig: BottomElasticSpringEnterConfig,
        SpringExitConfig: BottomElasticSpringExitConfig,
      }
    }
    return {
      SpringEnterConfig: DefaultSpringEnterConfig,
      SpringExitConfig: DefaultSpringExitConfig,
    }
  }
})

const Container = styled(Animated.View)<ContainerProps>`
  justify-content: ${(props) => {
    switch (props.type) {
      case 'bottom':
      case 'easy-in-out':
      case 'bottom_elastic':
        return 'flex-end'
      case 'top':
      case 'fade-in':
        return 'flex-start'
      default:
        return 'center'
    }
  }};
  flex: 1;
`

const BackgroundSwipeContainer = styled(Animated.View)`
  position: absolute;
  top: 0px;
  bottom: 0px;
  start: 0px;
  end: 0px;
`

const Background = styled(BackgroundSwipeContainer)<{ backgroundColor: string }>`
  background: ${(props) => props.backgroundColor};
`

const Layout = styled(Animated.View)`
  align-items: center;
`
