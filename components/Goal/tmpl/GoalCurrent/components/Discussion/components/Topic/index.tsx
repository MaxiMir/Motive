import { useState } from 'react'
import dynamic from 'next/dynamic'
import { TopicDto, MessageType, UserBaseDto } from 'dto'
import Message from './components/Message'
import { checkOnReply } from './helper'

const Box = dynamic(() => import('@mui/material/Box'))
const AppInView = dynamic(() => import('components/UI/AppInView'))
const User = dynamic(() => import('components/User'))
const Reply = dynamic(() => import('./components/Reply'))

interface TopicProps {
  owner: UserBaseDto
  topic: TopicDto
  inView: boolean
  onView: () => void
  isOwner: boolean
  onAdd: (topic: TopicDto) => void
}

export default function Topic({ owner, topic, isOwner, inView, onView, onAdd }: TopicProps): JSX.Element {
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
        supportFor={message.type !== MessageType.SUPPORT ? undefined : owner.name}
        onReply={!showReply ? undefined : onClick}
      />
      {showInput && (
        <User
          tmpl="input"
          user={owner}
          dayId={message.dayId}
          topicId={message.id}
          type={MessageType.ANSWER}
          onAdd={onAddCombine}
        />
      )}
      {answer && (
        <Box display="flex" alignItems="center" gap={1}>
          <Reply />
          <Message message={answer} answerFor={message.id} />
        </Box>
      )}
      {inView && <AppInView onView={onView} />}
    </>
  )
}
