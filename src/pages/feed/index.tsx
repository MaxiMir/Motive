import { Box, Typography } from '@mui/material'
import Container from 'shared/ui/Container'
import FadeTypography from 'shared/ui/FadeTypography'
import { useMessages } from './lib'

export function FeedPage() {
  const messages = useMessages()

  return (
    <Container>
      <Typography variant="h1" sx={{ mb: 3 }}>
        {messages.header}
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        flex={1}
        gap={1}
        height="80dvh"
      >
        <Typography variant="h5" component="p" color="primary">
          {messages.text}
        </Typography>
        <FadeTypography>⌨️</FadeTypography>
      </Box>
    </Container>
  )
}
