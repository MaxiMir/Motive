import { useState } from 'react'
import dynamic from 'next/dynamic'
import { RoleDto, TopicDto, UserBaseDto } from 'dto'
import Message from './components/Message'

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
}

export default function Topic({ dayId, owner, topic, role, inView, onView }: TopicProps): JSX.Element {
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
      {showInput && <User tmpl="input" user={owner} dayId={dayId} answer onAdd={onAdd} />}
      {answer?.message && (
        <AppBox alignItems="center" spacing={1}>
          <Reply />
          <Message {...answer} owner={owner} />
        </AppBox>
      )}
      {inView && <AppInView onView={onView} />}
    </>
  )
}
