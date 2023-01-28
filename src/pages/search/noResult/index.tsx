import { Box, Stack, Typography } from '@mui/material'
import { useMessages } from './lib'

interface NoResultProps {
  phrase: string
}

function NoResult({ phrase }: NoResultProps) {
  const messages = useMessages()

  return (
    <Stack spacing={1}>
      <Typography variant="h5" component="p">
        {messages.title} &#171;
        <Box component="span" color="zen.sand">
          {phrase}
        </Box>
        &#187;.
      </Typography>
      <Typography sx={{ color: 'zen.silent' }}>{messages.description}</Typography>
    </Stack>
  )
}

export default NoResult
