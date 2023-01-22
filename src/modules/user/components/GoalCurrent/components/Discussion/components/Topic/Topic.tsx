import { useState } from 'react'
import dynamic from 'next/dynamic'
import { UserBaseDto } from '@features/user'
import { TopicDto, MessageType } from '@features/topic'
import Message from './components/Message'
import { checkOnReply } from './helper'

const InView = dynamic(() => import('@ui/InView'))
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
          topicId={message.id}
          type={MessageType.Answer}
          onAdd={onAddCombine}
        />
      )}
      {answer && <Message message={answer} answerFor={message.id} />}
      {inView && <InView onView={onView} />}
    </>
  )
}

export default Topic
