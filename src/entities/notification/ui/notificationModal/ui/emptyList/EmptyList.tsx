import { Box, Stack, Typography } from '@mui/material'
import FadeEmoji from '@shared/ui/FadeEmoji'
import { useMessages } from './lib/hooks/useMessages'

function EmptyList() {
  const messages = useMessages()

  return (
    <Box display="flex" alignItems="center" height={490}>
      <Stack alignItems="center" spacing={2} width="100%">
        <Typography variant="h6" color="primary" component="p" mb={2}>
          {messages.title}
        </Typography>
        <FadeEmoji name="notification" />
      </Stack>
    </Box>
  )
}

export default EmptyList
