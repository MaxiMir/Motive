import { useRouter } from 'next/router'
import { Box, Button, Typography } from '@mui/material'
import AppEmoji from '@ui/AppEmoji'
import AppContainer from '@ui/AppContainer'
import { useMessages } from './hooks/useMessages'

interface CustomErrorProps {
  statusCode: number
}

function Error({ statusCode }: CustomErrorProps) {
  const messages = useMessages(statusCode)
  const router = useRouter()

  const onClick = () => router.back()

  return (
    <AppContainer>
      <Box display="flex" alignItems="center" justifyContent="center" flex={1}>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-between">
          <Typography component="h1" variant="h5">
            {messages.header}
          </Typography>
          <Typography sx={{ fontSize: '9em' }}>{statusCode}</Typography>
          <Typography sx={{ fontSize: '9em' }}>
            <AppEmoji name="error" onlyEmoji />
          </Typography>
          <Button
            aria-label={messages.backText}
            sx={{
              color: 'warning.light',
            }}
            onClick={onClick}
          >
            {messages.backText}
          </Button>
        </Box>
      </Box>
    </AppContainer>
  )
}

export default Error
