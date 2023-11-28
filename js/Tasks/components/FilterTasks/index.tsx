import React, { useState } from 'react'
import { EdgeInsets, SafeAreaInsetsContext } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { TextStyles, rem, Colors } from 'design-system'

import { CloseIcon } from 'shared/icons/CloseIcon'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Dropdown } from 'shared/Dropdown'
import { PriceDropdown } from 'shared/PriceDropdown'

interface Props {
  onClose: () => void
}
export const FilterTasks: React.FC<Props> = ({ onClose }) => {
  const [value, setValue] = useState('')

  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <>
          <Page insets={insets}>
            <Header>
              <Balancer />
              <TextStyles.BodyL>Find a task</TextStyles.BodyL>
              <CloseButton onPress={onClose}>
                <CloseIcon />
              </CloseButton>
            </Header>
            <Separator />
            <InputContainer>
              <PriceDropdown title={'Price'} didSelectItem={setValue} didExpandDropdown={() => {}} />
            </InputContainer>
            <InputContainer>
              <Dropdown
                title={'Meeting Place'}
                // key={'1'}
                dataSource={{
                  1: '1',
                  2: '2',
                  3: '3',
                  4: '4',
                  5: '5',
                  6: '6',
                  7: '7',
                }}
                initialItem={1}
                didSelectItem={setValue}
                didExpandDropdown={() => {}}
              />
            </InputContainer>
          </Page>
        </>
      )}
    </SafeAreaInsetsContext.Consumer>
  )
}

const Balancer = styled.View`
  width: ${rem(30)}px;
  height: ${rem(30)}px;
`

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-left: ${rem(12)}px;
  margin-right: ${rem(12)}px;
  margin-top: ${rem(10)}px;
`

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

const Page = styled.View<{ insets: EdgeInsets | null }>`
  height: 100%;
  width: 100%;
  margin-top: ${(props) => props.insets?.top * 2 ?? 0}px;
  background-color: white;
  border-top-right-radius: ${rem(15)}px;
  border-top-left-radius: ${rem(15)}px;
`
