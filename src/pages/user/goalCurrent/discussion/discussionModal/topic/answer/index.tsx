import { Button, Stack } from '@mui/material'
import CreateTopic from 'features/topic/create-topic'
import { MessageType, TopicDto, UserBaseDto } from 'shared/api'
import { useMessages } from './lib'

interface AnswerProps {
  dayId: number
  owner: UserBaseDto
  topicId: number
  onClose: () => void
  onAdd: (topic: TopicDto) => void
}

function Answer({ dayId, owner, topicId, onAdd, onClose }: AnswerProps) {
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
        type={MessageType.Answer}
        autoFocus
        onAdd={onAddCombine}
      />
      <Button size="small" sx={{ alignSelf: 'flex-end', color: 'zen.silent' }} onClick={onClose}>
        {messages.cancelText}
      </Button>
    </Stack>
  )
}

export default Answer
