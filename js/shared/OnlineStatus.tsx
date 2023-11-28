import moment from 'moment'
import React from 'react'
import { DotIcon } from 'shared/icons/DotIcon'
import styled from 'styled-components/native'
import { TextStyles, Colors, rem } from 'design-system'

interface Props {
  lastVisit: number
}
export const OnlineStatus: React.FC<Props> = ({ lastVisit }) => {
  const isOnline = (timestamp: number) => {
    const currentTime = moment()
    const targetTime = moment.unix(timestamp)

    const minutesDifference = currentTime.diff(targetTime, 'minutes')
    return minutesDifference <= 15
  }

  const renderText = (timestamp: number) => {
    if (isOnline(timestamp)) {
      return 'online'
    } else {
      return `Were online ${moment(timestamp * 1000).fromNow()}`
    }
  }
  return (
    <HStack>
      <DotIcon color={isOnline(lastVisit) ? Colors.normalGreen : Colors.greyInactive} />
      <Label color={isOnline(lastVisit) ? Colors.normalGreen : Colors.greyInactive}>{renderText(lastVisit)}</Label>
    </HStack>
  )
}

const HStack = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${rem(5)}px;
`

const Label = styled(TextStyles.CaptionM)<{ color: string }>`
  color: ${(props) => props.color};
`
