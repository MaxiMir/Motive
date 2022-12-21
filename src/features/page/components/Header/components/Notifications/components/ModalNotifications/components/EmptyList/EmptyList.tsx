import { Box, Typography } from '@mui/material'
import AppFadeIcon from '@ui/AppFadeIcon'
import { useMessages } from './hooks/useMessages'

function EmptyList() {
  const messages = useMessages()

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2} width="100%">
      <Typography variant="h6">{messages.title}</Typography>
      <AppFadeIcon name="notification" />
    </Box>
  )
}

export default EmptyList
