import { TopicWithQuestion, TopicWithSupport, Role, UserBase } from 'dto'
import AppBox from 'components/UI/AppBox'
import Message from './components/Message'
import Reactions from './components/Reactions'

export interface GoalProps {
  type: 'goal'
  topicUser: UserBase
  answerUser: UserBase | null
  topic: TopicWithQuestion | TopicWithSupport
  role: Role
}

export default function Goal({ topicUser, answerUser, topic, role }: GoalProps): JSX.Element {
  const { type, message, like, dislike, answer } = topic
  const showReply = role === 'OWNER' && type === 'QUESTION' && !answer

  return (
    <>
      <AppBox flexDirection="column" spacing={1}>
        <Message message={message} user={topicUser} />
        <Reactions like={like} dislike={dislike} onClick={!showReply ? undefined : () => false} />
      </AppBox>
      {answer?.message && answerUser && (
        <AppBox flexDirection="column" spacing={1} marginLeft="56px">
          <Message message={answer.message} user={answerUser} />
          <Reactions like={answer.like} dislike={answer.dislike} />
        </AppBox>
      )}
    </>
  )
}
