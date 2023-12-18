import React from 'react'
import styled from 'styled-components/native'
import { Colors, TextStyles, rem } from 'design-system'
import { UserAvatar } from 'shared/UserAvatar'

import { Type, UserRegalia } from 'shared/UserRegalia'

interface Props {
  name: string
  image: string
  taskDone: number
  ratinig: number
  feedbacks: number
}

export const ProfileCard: React.FC<Props> = ({ name, image, taskDone, ratinig, feedbacks }) => {
  const handleOnPress = () => {}
  return (
    <Container>
      <UserAvatar name={name} size={rem(100)} image={image} onPress={handleOnPress} />
      <Headline>{name}</Headline>
      <HStack>
        <UserRegalia type={Type.taskDone} value={taskDone} />
        <UserRegalia type={Type.raiting} value={ratinig} />
        <UserRegalia type={Type.feedbacks} value={feedbacks} />
      </HStack>
    </Container>
  )
}

const HStack = styled.View`
  gap: ${rem(37)}px;
  flex-direction: row;
  justify-content: space-around;
`

const Headline = styled(TextStyles.HeadingM)`
  padding: ${rem(10)}px;
`
const Container = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: ${rem(15)}px;
  background-color: ${Colors.grayButtonBackground};
  padding: ${rem(12)}px;
`
