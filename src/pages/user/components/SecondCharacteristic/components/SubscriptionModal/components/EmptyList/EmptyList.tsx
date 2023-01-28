import { Box, Stack, Typography } from '@mui/material'
import FadeEmoji from 'shared/ui/FadeEmoji'
import { useMessages } from './hooks/useMessages'

function EmptyList() {
  const messages = useMessages()

  return (
    <Box display="flex" alignItems="center" width="100%" height={490}>
      <Stack alignItems="center" spacing={2} width="100%">
        <Typography variant="h6" component="p">
          {messages.title}
        </Typography>
        <FadeEmoji name="followers" />
      </Stack>
    </Box>
  )
}

export default EmptyList
