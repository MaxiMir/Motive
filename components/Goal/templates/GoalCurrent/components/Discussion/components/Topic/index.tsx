import { useState } from 'react'
import { TopicWithQuestion, TopicWithSupport, Role, UserBase } from 'dto'
import Message from './components/Message'

export interface TopicProps {
  topicUser: UserBase
  answerUser?: UserBase
  owner: UserBase
  topic: TopicWithQuestion | TopicWithSupport
  role: Role
}

export default function Topic({ topicUser, answerUser, owner, topic, role }: TopicProps): JSX.Element {
  const [showInput, setShowInput] = useState(false)
  const { type, message, like, dislike, answer } = topic
  const showReply = role === 'OWNER' && type === 'QUESTION' && !answer

  return (
    <>
      <Message
        message={message}
        user={topicUser}
        owner={owner}
        like={like}
        dislike={dislike}
        support={type === 'SUPPORT'}
        onClick={!showReply ? undefined : () => setShowInput(true)}
      />
      {showInput && <div>INPUT ANSWER</div>}
      {answer?.message && answerUser && (
        <Message
          message={answer.message}
          owner={owner}
          user={answerUser}
          like={answer.like}
          dislike={answer.dislike}
          answer
          support
        />
      )}
    </>
  )
}
