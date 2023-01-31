import { useState } from 'react'
import dynamic from 'next/dynamic'
import { TopicDto, MessageType, UserBaseDto } from 'shared/api'
import { checkOnReply } from './lib'
import Message from './message'

const InView = dynamic(() => import('shared/ui/InView'))
const CreateTopic = dynamic(() => import('features/topic/create-topic'))

interface TopicProps {
  dayId: number
  owner: UserBaseDto
  topic: TopicDto
  inView: boolean
  onView: () => void
  isOwner: boolean
  onAdd: (topic: TopicDto) => void
}

function Topic({ dayId, owner, topic, isOwner, inView, onView, onAdd }: TopicProps) {
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
        <CreateTopic
          dayId={dayId}
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
