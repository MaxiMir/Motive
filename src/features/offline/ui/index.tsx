import { Box, Button, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import Container from 'shared/ui/Container'
import FadeTypography from 'shared/ui/FadeTypography'
import { useMessages } from './lib'

function Offline() {
  const { reload } = useRouter()
  const messages = useMessages()

  return (
    <Container>
      <Box display="flex" alignItems="center" justifyContent="center" flex={1} height="100%">
        <Stack alignItems="center" gap={1}>
          <FadeTypography fontSize="9em">📡</FadeTypography>
          <Typography component="h1" variant="h5">
            {messages.header}
          </Typography>
          <Typography>{messages.description}</Typography>
          <Button sx={{ color: 'warning.light' }} onClick={reload}>
            {messages.reloadText}
          </Button>
        </Stack>
      </Box>
    </Container>
  )
}

export default Offline
