import { Stack, Typography } from '@mui/material'
import FadeTypography from 'shared/ui/FadeTypography'
import { useMessages } from './lib'

function EmptyList() {
  const messages = useMessages()

  return (
    <Stack alignItems="center" gap={1}>
      <FadeTypography>✏️</FadeTypography>
      <Typography variant="h6" color="primary" component="p">
        {messages.nothingText}...
      </Typography>
    </Stack>
  )
}

export default EmptyList
