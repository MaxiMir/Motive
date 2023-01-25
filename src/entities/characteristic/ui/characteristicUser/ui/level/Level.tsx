import { Box } from '@mui/material'
import { useMessages } from './lib/hooks/useMessages'

function Level() {
  const messages = useMessages()

  return (
    <Box component="sup" marginLeft="2px" fontSize={10} color="text.disabled">
      {messages.lvlText}
    </Box>
  )
}

export default Level