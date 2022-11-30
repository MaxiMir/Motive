import { useState } from 'react'
import dynamic from 'next/dynamic'
import { TopicDto, MessageType, UserBaseDto } from '@dto'
import Message from './components/Message'
import { checkOnReply } from './helper'

const Box = dynamic(() => import('@mui/material/Box'))
const AppIcon = dynamic(() => import('@ui/AppIcon'))
const AppInView = dynamic(() => import('@ui/AppInView'))
const UserInput = dynamic(() => import('../UserInput'))

interface TopicProps {
  owner: UserBaseDto
  topic: TopicDto
  inView: boolean
  onView: () => void
  isOwner: boolean
  onAdd: (topic: TopicDto) => void
}

function Topic({ owner, topic, isOwner, inView, onView, onAdd }: TopicProps) {
  const { answer, ...message } = topic
  const [showInput, setShowInput] = useState(false)
  const showReply = checkOnReply(isOwner, topic)

  const onClick = () => setShowInput(true)

  const onAddCombine = (question: TopicDto) => {
    setShowInput(false)
    onAdd(question)
  }

  return (
    <>
      <Message
        message={message}
        supportFor={message.type !== MessageType.Support ? undefined : owner.name}
        onReply={!showReply ? undefined : onClick}
      />
      {showInput && (
        <UserInput
          user={owner}
          dayId={message.dayId}
          topicId={message.id}
          type={MessageType.Answer}
          onAdd={onAddCombine}
        />
      )}
      {answer && (
        <Box display="flex" alignItems="center" gap={1}>
          <AppIcon name="reply" sx={{ color: '#606061', marginRight: 1 }} />
          <Message message={answer} answerFor={message.id} />
        </Box>
      )}
      {inView && <AppInView onView={onView} />}
    </>
  )
}

export default Topic
