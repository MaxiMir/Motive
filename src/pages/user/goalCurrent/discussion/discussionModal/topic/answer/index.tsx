import { Button, Stack } from '@mui/material'
import CreateTopic from 'features/topic/create-topic'
import { TopicType, TopicDto, UserBaseDto } from 'shared/api'
import { useMessages } from './lib'

interface AnswerProps {
  dayId: number
  owner: UserBaseDto
  user: UserBaseDto
  topicId: number
  onClose: () => void
  onAdd: (topic: TopicDto) => void
}

function Answer({ dayId, owner, user, topicId, onAdd, onClose }: AnswerProps) {
  const messages = useMessages()

  const onAddCombine = (question: TopicDto) => {
    onClose()
    onAdd(question)
  }

  return (
    <Stack gap={1}>
      <CreateTopic
        dayId={dayId}
        user={owner}
        topicId={topicId}
        type={TopicType.Answer}
        autoFocus
        replyTo={user.name}
        onAdd={onAddCombine}
      />
      <Stack direction="row-reverse">
        <Button size="small" sx={{ color: 'zen.silent' }} onClick={onClose}>
          {messages.cancelText}
        </Button>
      </Stack>
    </Stack>
  )
}

export default Answer
