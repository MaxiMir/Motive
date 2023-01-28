import { Box, Typography } from '@mui/material'
import Container from 'shared/ui/Container'
import FadeEmoji from 'shared/ui/FadeEmoji'
import { useMessages } from './lib'

function FeedPage() {
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
        <FadeEmoji name="keyboard" />
      </Box>
    </Container>
  )
}

export default FeedPage
