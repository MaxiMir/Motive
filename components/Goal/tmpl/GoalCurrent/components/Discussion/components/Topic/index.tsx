import { useState } from 'react'
import dynamic from 'next/dynamic'
import { RoleDto, TopicDto, UserBaseDto } from 'dto'
import Message from './components/Message'

interface TopicProps {
  dayId: number
  owner: UserBaseDto
  topic: TopicDto
  role: RoleDto
}

const UserCard = dynamic(() => import('components/UserCard'))
const AppBox = dynamic(() => import('components/UI/AppBox'))
const Reply = dynamic(() => import('./components/Reply'))

export default function Topic({ dayId, owner, topic, role }: TopicProps): JSX.Element {
  const [showInput, setShowInput] = useState(false)
  const { answer, ...message } = topic
  const showReply = role === 'OWNER' && !topic.answer

  const onClick = () => setShowInput(true)

  const onAdd = (question: TopicDto) => {
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
