import { Box, Button, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import Container from 'shared/ui/Container'
import FadeTypography from 'shared/ui/FadeTypography'
import { useMessages } from './lib'

interface ErrorPageProps {
  header?: string
}

export function ErrorPage({ header }: ErrorPageProps) {
  const messages = useMessages(header)
  const router = useRouter()

  const onClick = () => router.back()

  return (
    <Container>
      <Box display="flex" alignItems="center" justifyContent="center" flex={1}>
        <Stack alignItems="center" gap={1}>
          <FadeTypography fontSize="9em">👺</FadeTypography>
          <Typography component="h1" variant="h5">
            {messages.header}
          </Typography>
          <Button sx={{ color: 'warning.light' }} onClick={onClick}>
            {messages.backText}
          </Button>
        </Stack>
      </Box>
    </Container>
  )
}