import { useState } from 'react'
import dynamic from 'next/dynamic'
import { RoleDto, TopicDto, MessageType, UserBaseDto } from 'dto'
import Message from './components/Message'
import { checkOnReply } from './helper'

const AppInView = dynamic(() => import('components/UI/AppInView'))
const User = dynamic(() => import('components/User'))
const AppBox = dynamic(() => import('components/UI/AppBox'))
const Reply = dynamic(() => import('./components/Reply'))

interface TopicProps {
  goalId: number
  dayId: number
  owner: UserBaseDto
  topic: TopicDto
  role: RoleDto
  client?: UserBaseDto
  inView: boolean
  onView: () => void
  onAdd: (topic: TopicDto) => void
}

export default function Topic({
  goalId,
  dayId,
  owner,
  topic,
  role,
  client,
  inView,
  onView,
  onAdd,
}: TopicProps): JSX.Element {
  const { answer, ...message } = topic
  const [showInput, setShowInput] = useState(false)
  const showReply = checkOnReply(role, topic)

  const onClick = () => setShowInput(true)

  const onAddCombine = (question: TopicDto) => {
    setShowInput(false)
    onAdd(question)
  }

  return (
    <>
      <Message
        goalId={goalId}
        dayId={dayId}
        message={message}
        supportFor={message.type !== MessageType.SUPPORT ? undefined : owner.name}
        client={client}
        onClick={!showReply ? undefined : onClick}
      />
      {showInput && (
        <User
          tmpl="input"
          user={owner}
          dayId={dayId}
          topicId={message.id}
          type={MessageType.ANSWER}
          onAdd={onAddCombine}
        />
      )}
      {answer && (
        <AppBox alignItems="center" spacing={1}>
          <Reply />
          <Message goalId={goalId} dayId={dayId} message={answer} answerFor={message.id} client={client} />
        </AppBox>
      )}
      {inView && <AppInView onView={onView} />}
    </>
  )
}
