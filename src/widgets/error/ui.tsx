import { Box, Button, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useRouter } from 'next/router'
import Container from '@shared/ui/Container'
import Emoji from '@shared/ui/Emoji'
import { useMessages } from './lib/hooks/useMessages'

interface ErrorProps {
  statusCode: number
}

function Error({ statusCode }: ErrorProps) {
  const messages = useMessages(statusCode)
  const router = useRouter()

  const onClick = () => router.back()

  return (
    <Container>
      <Box display="flex" alignItems="center" justifyContent="center" flex={1}>
        <Stack alignItems="center" justifyContent="space-between">
          <Typography component="h1" variant="h5">
            {messages.header}
          </Typography>
          <DescriptionText>{statusCode}</DescriptionText>
          <DescriptionText>
            <Emoji name="error" onlyEmoji />
          </DescriptionText>
          <Button sx={{ color: 'warning.light' }} onClick={onClick}>
            {messages.backText}
          </Button>
        </Stack>
      </Box>
    </Container>
  )
}

const DescriptionText = styled(Typography)({
  fontSize: '9em',
})
export default Error
