import { Stack, Typography } from '@mui/material'
import FadeEmoji from 'shared/ui/FadeEmoji'
import { useMessages } from './lib'
import OwnerDescription from './ownerDescription'

interface AddGoalProps {
  clientPage: boolean
}

function EmptyGoals({ clientPage }: AddGoalProps) {
  const messages = useMessages(clientPage)

  return (
    <Stack justifyContent="center" alignItems="center" spacing={1} flex={1}>
      <Typography variant="h6" component="p" color="primary" mb={2}>
        {messages.title}
      </Typography>
      <FadeEmoji name="goal" />
      {clientPage && <OwnerDescription />}
    </Stack>
  )
}

export default EmptyGoals
