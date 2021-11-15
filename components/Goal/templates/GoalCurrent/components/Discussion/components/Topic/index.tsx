import { useState } from 'react'
import dynamic from 'next/dynamic'
import { TopicWithQuestion, TopicWithSupport, Role, UserBase } from 'dto'
import Message from './components/Message'

export interface TopicProps {
  owner: UserBase
  topic: TopicWithQuestion | TopicWithSupport
  role: Role
  dayId: string
}

const UserCard = dynamic(() => import('components/UserCard'))

export default function Topic({ owner, topic, role, dayId }: TopicProps): JSX.Element {
  const [showInput, setShowInput] = useState(false)
  const { answer, ...message } = topic
  const showReply = role === 'OWNER' && topic.type === 'QUESTION' && !topic.answer

  const onClick = () => setShowInput(true)

  const onAdd = (question: TopicWithQuestion) => {
    setShowInput(false)
    console.log(question)
  }

  return (
    <>
      <Message {...message} owner={owner} onClick={!showReply ? undefined : onClick} />
      {showInput && <UserCard type="input" user={owner} dayId={dayId} answer onAdd={onAdd} />}
      {answer?.message && <Message {...answer} owner={owner} answer />}
    </>
  )
}
