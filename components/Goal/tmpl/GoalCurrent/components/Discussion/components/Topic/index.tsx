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
  dayId: number
  owner: UserBaseDto
  topic: TopicDto
  role: RoleDto
  inView: boolean
  onView: () => void
  onAdd: (topic: TopicDto) => void
}

export default function Topic({ dayId, owner, topic, role, inView, onView, onAdd }: TopicProps): JSX.Element {
  const { type, answers, ...message } = topic
  const [showInput, setShowInput] = useState(false)
  const showReply = checkOnReply(role, topic)

  const onClick = () => setShowInput(true)

  const onAddCombine = (question: TopicDto) => {
    setShowInput(false)
    onAdd(question)
  }

  return (
    <>
      <Message message={message} type={type} owner={owner} onClick={!showReply ? undefined : onClick} />
      {showInput && (
        <User
          tmpl="input"
          user={owner}
          dayId={dayId}
          answer={message.id}
          type={TopicType.SUPPORT}
          onAdd={onAddCombine}
        />
      )}
      {answers?.map((answer) => (
        <AppBox alignItems="center" spacing={1} key={answer.id}>
          <Reply />
          <Message message={answer} type={TopicType.SUPPORT} owner={owner} />
        </AppBox>
      ))}
      {inView && <AppInView onView={onView} />}
    </>
  )
}
