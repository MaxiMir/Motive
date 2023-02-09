import dynamic from 'next/dynamic'
import { TopicDto, MessageType, UserBaseDto } from 'shared/api'
import { useToggle } from 'shared/lib/hooks'
import { checkOnReply } from './lib'
import Message from './message'

const InView = dynamic(() => import('shared/ui/InView'))
const CreateTopic = dynamic(() => import('features/topic/create-topic'))

interface TopicProps {
  dayId: number
  owner: UserBaseDto
  topic: TopicDto
  inView: boolean
  onView: () => void
  isOwner: boolean
  onAdd: (topic: TopicDto) => void
}

function Topic({ dayId, owner, topic, isOwner, inView, onView, onAdd }: TopicProps) {
  const { answer, ...message } = topic
  const [creating, toggleCreating] = useToggle()
  const canReply = checkOnReply(isOwner, topic)
  const replyProps = !canReply ? undefined : { disabled: creating, onClick: toggleCreating }

  const onAddCombine = (question: TopicDto) => {
    toggleCreating()
    onAdd(question)
  }

  return (
    <>
      <Message
        message={message}
        supportFor={message.type !== MessageType.Support ? undefined : owner.name}
        replyProps={replyProps}
      />
      {answer && <Message message={answer} answerFor={message.id} />}
      {inView && <InView onView={onView} />}
      {creating && (
        <CreateTopic
          dayId={dayId}
          user={owner}
          topicId={message.id}
          type={MessageType.Answer}
          autoFocus
          onAdd={onAddCombine}
        />
      )}
    </>
  )
}

export default Topic
