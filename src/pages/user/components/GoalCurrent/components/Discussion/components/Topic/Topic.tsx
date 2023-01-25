import { useState } from 'react'
import dynamic from 'next/dynamic'
import { TopicDto, MessageType } from '@shared/api/topic'
import { UserBaseDto } from '@shared/api/user'
import Message from './components/Message'
import { checkOnReply } from './helper'

const InView = dynamic(() => import('@shared/ui/InView'))
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