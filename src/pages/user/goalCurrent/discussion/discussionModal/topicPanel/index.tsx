import { Box } from '@mui/material'
import CreateTopic from 'features/topic/create-topic'
import { UserBaseDto } from 'shared/api'

interface TopicPanelProps {
  dayId: number
  user: UserBaseDto
  owner: UserBaseDto
  viewerGoal: boolean
}

function TopicPanel({ dayId, user, owner, viewerGoal }: TopicPanelProps) {
  const type = !viewerGoal ? 'question' : 'support'

  return (
    <Box pt={1} flex={1}>
      <CreateTopic type={type} dayId={dayId} owner={owner} user={user} viewerGoal={viewerGoal} />
    </Box>
  )
}

export default TopicPanel
