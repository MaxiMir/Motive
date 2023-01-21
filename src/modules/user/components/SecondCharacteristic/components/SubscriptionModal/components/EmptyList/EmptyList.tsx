import { Box, Stack, Typography } from '@mui/material'
import AppFadeIcon from '@ui/AppFadeIcon'
import { useMessages } from './hooks/useMessages'

function EmptyList() {
  const messages = useMessages()

  return (
    <Box display="flex" alignItems="center" height={490}>
      <Stack alignItems="center" spacing={2} width="100%">
        <Typography variant="h6" color="primary">
          {messages.title}
        </Typography>
        <AppFadeIcon name="followers" />
      </Stack>
    </Box>
  )
}

export default EmptyList
