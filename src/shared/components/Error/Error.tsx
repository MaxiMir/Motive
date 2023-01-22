import { useRouter } from 'next/router'
import { Box, Button, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import Emoji from '@ui/Emoji'
import Container from '@ui/Container'
import { useMessages } from './hooks/useMessages'

interface CustomErrorProps {
  statusCode: number
}

function Error({ statusCode }: CustomErrorProps) {
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
