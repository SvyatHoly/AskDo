import { Colors, TextStyles, rem } from 'design-system'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { CloseIcon } from 'shared/icons/CloseIcon'
import { EdgeInsets, SafeAreaInsetsContext } from 'react-native-safe-area-context'

interface Props {
  label: string
  onEdit: () => void
  onDelete: () => void
  onClose: () => void
}

export const IntermediateModal: React.FC<Props> = ({ label, onEdit, onDelete, onClose }) => {
  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <Page insets={insets}>
          <Header>
            <Balancer />
            <TextStyles.BodyL>{label}</TextStyles.BodyL>
            <CloseButton onPress={onClose}>
              <CloseIcon />
            </CloseButton>
          </Header>
          <Separator />
          <VStack>
            <StyledOpacity onPress={onEdit}>
              <Text>Edit info</Text>
            </StyledOpacity>
            <StyledOpacity onPress={onDelete}>
              <RedText>Remove</RedText>
            </StyledOpacity>
          </VStack>
        </Page>
      )}
    </SafeAreaInsetsContext.Consumer>
  )
}

const CloseButton = styled(TouchableOpacity).attrs({
  hitSlop: { top: rem(12), right: rem(12), bottom: rem(12), left: rem(12) },
})`
  align-items: center;
  justify-content: center;
  width: ${rem(30)}px;
  height: ${rem(30)}px;
`

const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${Colors.greySuperLight};
`
const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${rem(12)}px;
`
const Balancer = styled.View`
  width: ${rem(30)}px;
  height: ${rem(30)}px;
`

const StyledOpacity = styled(TouchableOpacity)`
  height: ${rem(50)}px;
  align-items: center;
  justify-content: center;
`

const Text = styled(TextStyles.BodyM)``
const RedText = styled(TextStyles.BodyM)`
  color: ${Colors.redError};
`

const VStack = styled.View`
  flex-direction: column;
  padding: ${rem(12)}px;
`
const Page = styled.View<{ insets: EdgeInsets | null }>`
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  max-height: 100%;
  margin-top: ${(props) => props.insets?.top * 2 ?? 0}px;
  padding-bottom: ${(props) => props.insets?.bottom ?? 0}px;

  border-top-right-radius: ${rem(15)}px;
  border-top-left-radius: ${rem(15)}px;
  background-color: white;
`
