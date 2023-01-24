import { Typography } from '@mui/material'
import { useMessages } from './hooks/useMessages'

function Soon() {
  const messages = useMessages()

  return <Typography>{messages.soonText}...</Typography>
}

export default Soon
