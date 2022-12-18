import { Box, Typography } from '@mui/material'
import { useMessages } from './hooks/useMessages'

interface NoResultProps {
  phrase: string
}

function NoResult({ phrase }: NoResultProps) {
  const messages = useMessages()

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Typography variant="h5" component="p">
        {messages.title} &#171;
        <Box component="span" sx={{ color: 'zen.sand' }}>
          {phrase}
        </Box>
        &#187;.
      </Typography>
      <Typography sx={{ color: 'zen.silent' }}>{messages.description}</Typography>
    </Box>
  )
}

export default NoResult
