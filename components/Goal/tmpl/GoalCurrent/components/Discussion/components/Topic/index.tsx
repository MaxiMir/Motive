import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Role, Topic as TopicDTO, UserBase } from 'dto'
import Message from './components/Message'

interface TopicProps {
  dayId: number
  owner: UserBase
  topic: TopicDTO
  role: Role
}

const UserCard = dynamic(() => import('components/UserCard'))
const AppBox = dynamic(() => import('components/UI/AppBox'))
const Reply = dynamic(() => import('./components/Reply'))

export default function Topic({ dayId, owner, topic, role }: TopicProps): JSX.Element {
  const [showInput, setShowInput] = useState(false)
  const { answer, ...message } = topic
  const showReply = role === 'OWNER' && !topic.answer

  const onClick = () => setShowInput(true)

  const onAdd = (question: TopicDTO) => {
    setShowInput(false)
    console.log(question)
  }

  return (
    <>
      <Message {...message} owner={owner} onClick={!showReply ? undefined : onClick} />
      {showInput && <UserCard tmpl="input" user={owner} dayId={dayId} answer onAdd={onAdd} />}
      {answer?.message && (
        <AppBox alignItems="center" spacing={1}>
          <Reply />
          <Message {...answer} owner={owner} />
        </AppBox>
      )}
    </>
  )
}
