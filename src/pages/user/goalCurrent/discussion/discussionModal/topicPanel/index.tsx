import { Box } from '@mui/material'
import CreateTopic from 'features/topic/create-topic'
import { TopicType, UserBaseDto } from 'shared/api'

interface TopicPanelProps {
  dayId: number
  user: UserBaseDto
  owner: UserBaseDto
  clientGoal: boolean
}

function TopicPanel({ dayId, user, owner, clientGoal }: TopicPanelProps) {
  const type = !clientGoal ? TopicType.Question : TopicType.Support

  return (
    <Box pt={1} flex={1}>
      <CreateTopic type={type} dayId={dayId} owner={owner} user={user} clientGoal={clientGoal} />
    </Box>
  )
}

export default TopicPanel
