import { Box } from '@mui/material'
import { useMessages } from './hooks/useMessages'

function Level() {
  const messages = useMessages()

  return (
    <Box component="sup" sx={{ marginLeft: '0.125rem', fontSize: '0.625rem', color: 'text.disabled' }}>
      {messages.lvlText}
    </Box>
  )
}

export default Level
