import dynamic from 'next/dynamic'
import { TopicDto, TopicType, UserBaseDto } from 'shared/api'
import { useToggle } from 'shared/lib/hooks'
import { checkOnReply } from './lib'
import Message from './message'

const InView = dynamic(() => import('shared/ui/InView'))
const Answer = dynamic(() => import('./answer'))

interface TopicProps {
  dayId: number
  owner: UserBaseDto
  topic: TopicDto
  inView: boolean
  onView: () => void
  isOwner: boolean
}

function Topic({ dayId, owner, topic, isOwner, inView, onView }: TopicProps) {
  const { answer, ...message } = topic
  const [creating, toggleCreating] = useToggle()
  const canReply = checkOnReply(isOwner, topic)
  const replyProps = !canReply ? undefined : { disabled: creating, onClick: toggleCreating }

  return (
    <>
      <Message
        message={message}
        supportFor={message.type !== TopicType.Support ? undefined : owner.name}
        replyProps={replyProps}
      />
      {answer && <Message message={answer} answerFor={message.id} />}
      {inView && <InView onView={onView} />}
      {creating && (
        <Answer
          dayId={dayId}
          owner={owner}
          user={message.user}
          topicId={message.id}
          onClose={toggleCreating}
        />
      )}
    </>
  )
}

export default Topic
