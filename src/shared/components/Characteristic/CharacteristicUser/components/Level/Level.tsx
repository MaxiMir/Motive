import { Box } from '@mui/material'
import { useMessages } from './hooks/useMessages'

function Level() {
  const messages = useMessages()

  return (
    <Box component="sup" sx={{ marginLeft: '2px', fontSize: '10px', color: 'text.disabled' }}>
      {messages.lvlText}
    </Box>
  )
}

export default Level
