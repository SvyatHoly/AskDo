import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import {
  NativeSyntheticEvent,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextInputFocusEventData,
  View,
  ViewProps,
} from 'react-native'
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import styled from 'styled-components/native'
import { Colors, cfs, rem, TextStyles } from 'design-system'

export enum ValidationErrorStyle {
  primary, // includes red cross icon
  form, // includes red border, error message in red rectangle below field and red exclamation icon
}

interface TextInputProps extends Pick<ViewProps, 'style'>, Omit<RNTextInputProps, 'style' | 'placeholder'> {
  inputRef?: React.RefObject<RNTextInput>
  required?: boolean
  multiline?: boolean
  placeholder?: ReactNode
  isValid?: boolean
  errorMessage?: ReactNode
  minHeight?: number
  validationErrorStyle?: ValidationErrorStyle
  icon?: ReactNode
}

export const TextInput: React.FC<TextInputProps> = (props) => {
  const {
    style,
    value,
    isValid,
    placeholder,
    errorMessage,
    inputRef,
    required,
    multiline,
    minHeight,
    validationErrorStyle,
    icon,
    onChangeText,
    onFocus,
    onBlur,
    ...textInputProps
  } = props

  const [internalValue, setInternalValue] = useState(value ?? '')
  const [focused, setFocused] = useState(false)
  const [isValidInternal, setValidInternal] = useState(isValid)

  useEffect(() => {
    const nextValue = value ?? ''
    if (nextValue !== internalValue) {
      setInternalValue(nextValue)
    }
  }, [value, internalValue])

  useEffect(() => {
    if (isValidInternal !== isValid) {
      setValidInternal(isValid)
    }
  }, [isValid, isValidInternal])

  const placeholderReduced = internalValue.length > 0
  const placeholderStyle = useAnimatedStyle(() => {
    const easingConfig = {
      duration: 250,
      easing: Easing.out(Easing.quad),
    }
    return {
      opacity: withTiming(placeholderReduced ? 0 : 1, easingConfig),
    }
  })

  const showValidationUI = useMemo(
    () => typeof isValid === 'boolean' && internalValue.length > 0,
    [internalValue.length, isValid]
  )
  const showFormInvalidState = useMemo(
    () => showValidationUI && !isValidInternal && validationErrorStyle === ValidationErrorStyle.form,
    [showValidationUI, isValidInternal, validationErrorStyle]
  )
  const editableStyle = useMemo(() => {
    const defaultHorizontalPadding = 5
    const errorBorderWidth = 1
    return {
      opacity: textInputProps.editable || showFormInvalidState || internalValue.length > 0 ? 1 : 0.5,
      borderWidth: showFormInvalidState ? rem(errorBorderWidth) : 0,
      paddingLeft: rem(showFormInvalidState ? defaultHorizontalPadding - errorBorderWidth : defaultHorizontalPadding),
      borderColor: showFormInvalidState ? Colors.red : undefined,
      borderRadius: showFormInvalidState ? rem(12) : 0,
      backgroundColor: showFormInvalidState ? Colors.red10 : undefined,
    }
  }, [showFormInvalidState, textInputProps.editable, internalValue.length])
  const isPrimaryValidationStyle = validationErrorStyle !== ValidationErrorStyle.form

  return (
    <Container style={style}>
      <Layout minHeight={minHeight} isMultiline={multiline}>
        <Placeholder.Container hasIcon={!!icon} isMultiline={multiline}>
          <Placeholder.Body style={placeholderStyle} ellipsizeMode={'tail'}>
            {placeholder}
          </Placeholder.Body>
        </Placeholder.Container>
        {icon && <IconContainer>{icon}</IconContainer>}

        <StyledRNTextInput
          {...textInputProps}
          ref={inputRef}
          style={editableStyle}
          value={value ?? internalValue}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          numberOfLines={multiline === true ? undefined : 1}
          multiline={multiline}
        />
        {showValidationUI && renderInlineValidationUI()}
      </Layout>
      {errorMessage ? <ErrorLabel>{errorMessage}</ErrorLabel> : null}
      {showValidationUI && !isPrimaryValidationStyle ? renderBottomFormValidationUI() : null}
    </Container>
  )

  function renderInlineValidationUI() {
    if (typeof isValid !== 'boolean') return null
    switch (validationErrorStyle) {
      case (ValidationErrorStyle.primary, undefined):
        return (
          <ValidatorIcon style={editableStyle}>
            {/* {isValid ? (
              <Icon type={IconType.TICK_CIRCLE} size={IconSize.BIG} />
            ) : (
              <Icon type={IconType.CROSS_CIRCLE} size={IconSize.BIG} color={Colors.red} />
            )} */}
          </ValidatorIcon>
        )
      case ValidationErrorStyle.form:
        return isValid ? null : <></>
      default:
        return null
    }
  }

  function renderBottomFormValidationUI() {
    if (typeof isValid !== 'boolean') return null
    return isValid ? null : (
      <FormError.Bubble>
        {/* {formValidationErrorMessage && <FormError.Text>{formatMessage(formValidationErrorMessage)}</FormError.Text>} */}
      </FormError.Bubble>
    )
  }

  function handleFocus(e: NativeSyntheticEvent<TextInputFocusEventData>) {
    setFocused(true)
    onFocus?.(e)
  }

  function handleBlur(e: NativeSyntheticEvent<TextInputFocusEventData>) {
    setFocused(false)
    onBlur?.(e)
  }

  function handleChangeText(text: string) {
    setInternalValue(text)
    onChangeText?.(text)
  }
}

const Container = styled(View)``

const IconContainer = styled.View`
  margin-right: ${rem(5)}px;
  align-items: center;
  justify-content: center;
`

const Layout = styled.View<{ minHeight?: number; isMultiline?: boolean }>`
  /* ${({ isMultiline }) => (isMultiline ? '' : 'height: ' + String(rem(54)) + 'px;')} */
  /* background: ${Colors.white10}; */
  /* border-radius: ${rem(12)}px; */
  flex-direction: row;
  /* align-items: center; */
  padding-left: ${rem(20)}px;
  /* height: 100%; */
  /* min-height: ${({ minHeight }) => rem(minHeight ?? 0)}px; */
`

const StyledRNTextInput = styled(RNTextInput)`
  flex: 1;
  /* align-self: stretch; */
  font-family: Inter;
  font-size: ${cfs(16)}px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: ${cfs(-1.04)}px;
  color: ${Colors.darkBlue};
`

const ValidatorIcon = styled.View`
  margin-end: ${rem(16)}px;
`

const Placeholder = {
  Container: styled.View<{ hasIcon: boolean; isMultiline?: boolean }>`
    position: absolute;
    /* min-height: 200px; */
    width: 90%;
    /* height: 100%;
    width: 100%; */
    /* flex: 1; */
    flex-wrap: wrap;
    top: ${({ isMultiline }) => rem(isMultiline ? 5 : 0)}px;

    left: ${({ hasIcon }) => rem(hasIcon ? 55 : 30)}px;
    /* padding-top: ${rem(22)}px;
    padding-start: ${rem(22)}px;
    padding-end: ${rem(16)}px; */
    /* padding-bottom: ${rem(16)}px; */
    align-items: flex-start;
  `,
  Body: styled(Animated.Text)`
    color: #9d9d9d;
    font-family: Inter;
    font-size: ${cfs(16)}px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: ${cfs(-1.04)}px;
    /* line-height: ${cfs(-150)}px; */
    opacity: 0.5;
  `,
  Required: styled.Text`
    color: ${Colors.red};
  `,
}

const ErrorLabel = styled(TextStyles.Footnote)`
  margin-horizontal: ${rem(16)}px;
  margin-top: ${rem(4)}px;
  color: ${Colors.red};
  line-height: ${cfs(12 * 1.2)}px;
  min-height: ${cfs(12 * 1.2)}px;
`

const FormError = {
  Bubble: styled.View`
    border-radius: ${rem(8)}px;
    background: ${Colors.red30};
    margin-top: ${rem(8)}px;
  `,
  Text: styled(TextStyles.CalloutM)`
    margin-horizontal: ${rem(16)}px;
    margin-vertical: ${rem(8)}px;
  `,
}
