import { Typography } from '@mui/material'
import { useMessages } from './hooks/useMessages'

function Nothing() {
  const messages = useMessages()

  return <Typography>{messages.nothingText}</Typography>
}

export default Nothing
