import { Stack, Typography } from '@mui/material'
import AppFadeIcon from '@ui/AppFadeIcon'
import { useMessages } from './hooks/useMessages'
import OwnerDescription from './components/OwnerDescription'

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
      <AppFadeIcon name="goal" />
      {clientPage && <OwnerDescription />}
    </Stack>
  )
}

export default EmptyGoals
