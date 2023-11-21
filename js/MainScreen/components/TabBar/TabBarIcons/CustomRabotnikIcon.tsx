import React, { useMemo } from 'react'
import styled from 'styled-components/native'
import { Colors, rem } from 'sweatcoin-design-system'

import { useShouldShowRabotnikDot } from 'MainScreen/hooks/useShouldShowRabotnikDot'
import { LinearGradient } from 'shared/ui/LinearGradient'

import { useEmployeeProjectLogo } from '../../../hooks/useEmployeeProjectLogo'

export const CustomRabotnikIcon = ({ isSelected }: { isSelected?: boolean }) => {
  const logo = useEmployeeProjectLogo()
  const dotIsVisible = useShouldShowRabotnikDot()

  const icon = useMemo(() => {
    const Container = dotIsVisible ? IconWithDotContainer : React.Fragment

    return (
      <Container>
        <RabotnikIconContainer>
          <RabotnikIconBorderGradient isSelected={!!isSelected}>
            <StyledRabotnikIcon source={{ uri: logo ?? '' }} isSelected={!!isSelected} />
          </RabotnikIconBorderGradient>
        </RabotnikIconContainer>
        {dotIsVisible ? <NewItemsDot /> : null}
      </Container>
    )
  }, [isSelected, dotIsVisible, logo])

  return icon
}

const IconWithDotContainer = styled.View``

const NewItemsDot = styled.View`
  position: absolute;
  top: ${rem(9)}px;
  right: ${rem(4)}px;
  width: ${rem(5)}px;
  height: ${rem(5)}px;
  border-radius: ${rem(2.5)}px;
  background-color: ${Colors.orange};
`

const RabotnikIconContainer = styled.View`
  width: ${rem(48)}px;
  height: ${rem(48)}px;
  justify-content: center;
  align-items: center;
`

const StyledRabotnikIcon = styled.Image<{ isSelected: boolean }>`
  width: ${({ isSelected }) => (isSelected ? rem(28) : rem(32))}px;
  height: ${({ isSelected }) => (isSelected ? rem(28) : rem(32))}px;
  border-radius: ${({ isSelected }) => (isSelected ? rem(28) : rem(32))}px;
`

const RabotnikIconBorderGradient = styled(LinearGradient).attrs({
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
  colors: ['#FB5CA0', '#975EF3'],
})<{ isSelected: boolean }>`
  width: ${rem(32)}px;
  height: ${rem(32)}px;
  border-radius: ${rem(32)}px;
  align-items: center;
  justify-content: center;
`
