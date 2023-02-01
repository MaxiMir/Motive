import { Typography } from '@mui/material'
import { useMessages } from './lib'

function Soon() {
  const messages = useMessages()

  return <Typography>{messages.soonText}...</Typography>
}

export default Soon
