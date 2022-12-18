import { Box, Typography } from '@mui/material'
import AppFadeIcon from '@ui/AppFadeIcon'
import { useMessages } from './hooks/useMessages'
import OwnerDescription from './components/OwnerDescription/OwnerDescription'

interface AddGoalProps {
  clientPage: boolean
}

function EmptyGoals({ clientPage }: AddGoalProps) {
  const messages = useMessages(clientPage)

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={1} mt={3} flex={1}>
      <Typography variant="h6" component="p" color="primary">
        {messages.title}
      </Typography>
      <AppFadeIcon name="goal" />
      {clientPage && <OwnerDescription />}
    </Box>
  )
}

export default EmptyGoals
