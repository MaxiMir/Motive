import { useState } from 'react'
import dynamic from 'next/dynamic'
import { RoleDto, TopicDto, TopicType, UserBaseDto } from 'dto'
import Message from './components/Message'
import { checkOnReply } from './helper'

const AppInView = dynamic(() => import('components/UI/AppInView'))
const User = dynamic(() => import('components/User'))
const AppBox = dynamic(() => import('components/UI/AppBox'))
const Reply = dynamic(() => import('./components/Reply'))

interface TopicProps {
  dayID: number
  owner: UserBaseDto
  topic: TopicDto
  role: RoleDto
  inView: boolean
  onView: () => void
  onAdd: (topic: TopicDto) => void
}

export default function Topic({ dayID, owner, topic, role, inView, onView, onAdd }: TopicProps): JSX.Element {
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
        dayID={dayID}
        message={message}
        supportFor={message.type !== TopicType.SUPPORT ? undefined : owner.name}
        onClick={!showReply ? undefined : onClick}
      />
      {showInput && (
        <User
          tmpl="input"
          user={owner}
          dayID={dayID}
          topicID={message.id}
          type={TopicType.ANSWER}
          onAdd={onAddCombine}
        />
      )}
      {answer && (
        <AppBox alignItems="center" spacing={1}>
          <Reply />
          <Message dayID={dayID} message={answer} answerFor={message.id} supportFor={message.user.name} />
        </AppBox>
      )}
      {inView && <AppInView onView={onView} />}
    </>
  )
}
