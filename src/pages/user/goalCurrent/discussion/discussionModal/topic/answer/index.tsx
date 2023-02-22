import { Box, Button, Stack } from '@mui/material'
import { useIntl } from 'react-intl'
import CreateTopic from 'features/topic/create-topic'
import { TopicType, UserBaseDto } from 'shared/api'

interface AnswerProps {
  dayId: number
  owner: UserBaseDto
  user: UserBaseDto
  topicId: number
  onClose: () => void
}

function Answer({ dayId, owner, user, topicId, onClose }: AnswerProps) {
  const { formatMessage } = useIntl()
  const cancelText = formatMessage({ id: 'common.cancel' })

  return (
    <Stack gap={1}>
      <CreateTopic
        type={TopicType.Answer}
        topicId={topicId}
        dayId={dayId}
        owner={owner}
        user={owner}
        replyTo={user.name}
        autoFocus
        onSuccess={onClose}
      />
      <Box display="flex" justifyContent="flex-end" pr={5}>
        <Button size="small" sx={{ color: 'zen.silent' }} onClick={onClose}>
          {cancelText}
        </Button>
      </Box>
    </Stack>
  )
}

export default Answer
