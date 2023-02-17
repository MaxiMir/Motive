import { Button, Stack, Typography } from '@mui/material'
import CreateTopic from 'features/topic/create-topic'
import { TopicType, UserBaseDto } from 'shared/api'
import { useMessages } from './lib'

interface AnswerProps {
  dayId: number
  owner: UserBaseDto
  user: UserBaseDto
  topicId: number
  onClose: () => void
}

function Answer({ dayId, owner, user, topicId, onClose }: AnswerProps) {
  const messages = useMessages()

  return (
    <Stack gap={1}>
      <CreateTopic
        dayId={dayId}
        user={owner}
        topicId={topicId}
        type={TopicType.Answer}
        startIcon={<Typography color="primary">{user.name}</Typography>}
        autoFocus
        onSuccess={onClose}
      />
      <Stack direction="row" alignItems="center" gap={1} pl={8}>
        <Typography variant="caption" sx={{ color: 'zen.silent' }}>
          {messages.enterText}
        </Typography>
        <Button size="small" sx={{ color: 'zen.silent' }} onClick={onClose}>
          {messages.cancelText}
        </Button>
      </Stack>
    </Stack>
  )
}

export default Answer
