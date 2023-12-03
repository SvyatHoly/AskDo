import React from 'react'
import styled from 'styled-components/native'
import { Colors, TextStyles, rem } from 'design-system'
import { UserAvatar } from 'shared/UserAvatar'
import moment from 'moment'
import { TouchableOpacity } from 'react-native'
import { Navigation } from 'navigation'
import { screens } from 'ClientProfile/constants'
export interface Props {
  image: string
  name: string
  lastVisit: number
}

export const Author: React.FC<Props> = ({ image, name, lastVisit }) => {
  const getStatus = (timestamp: number) => {
    const currentTime = moment()
    const targetTime = moment.unix(timestamp)

    const minutesDifference = currentTime.diff(targetTime, 'minutes')

    if (minutesDifference <= 15) {
      return 'online'
    } else {
      return `Were online ${moment(timestamp * 1000).fromNow()}`
    }
  }

  const handlePress = () => {
    Navigation.navigate(screens.ClientDetailsScreen)
  }

  return (
    <Container onPress={handlePress}>
      <VStack>
        <BlackLabel>Task author</BlackLabel>
        <HStack>
          <UserAvatar image={image} name={image} />
          <MiniVStack>
            <BlackLabel>{name}</BlackLabel>
            <GrayLabel>{getStatus(lastVisit)}</GrayLabel>
          </MiniVStack>
        </HStack>
      </VStack>
    </Container>
  )
}

const Container = styled(TouchableOpacity)``
const HStack = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${rem(10)}px;
  justify-content: flex-start;
`

const VStack = styled.View`
  flex-direction: column;
  padding: ${rem(20)}px;
  border-radius: ${rem(15)}px;
  background-color: ${Colors.greyButtonBackground};
  gap: ${rem(10)}px;
`

const GrayLabel = styled(TextStyles.LabelM)`
  color: ${Colors.grayInactive};
`

const BlackLabel = styled(TextStyles.BodyM)`
  color: ${Colors.darkText2};
`

const MiniVStack = styled.View`
  flex-direction: column;
  align-content: flex-start;
`
