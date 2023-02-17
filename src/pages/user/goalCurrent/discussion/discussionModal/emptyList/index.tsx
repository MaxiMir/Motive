import { Box, Stack, Typography } from '@mui/material'
import FadeTypography from 'shared/ui/FadeTypography'
import { useMessages } from './lib'

function EmptyList() {
  const messages = useMessages()

  return (
    <Box display="flex" alignItems="center" width="100%" height="100%">
      <Stack alignItems="center" gap={1} width="100%">
        <FadeTypography>💬</FadeTypography>
        <Typography variant="h6" color="primary" component="p">
          {messages.nothingText}
        </Typography>
      </Stack>
    </Box>
  )
}

export default EmptyList
