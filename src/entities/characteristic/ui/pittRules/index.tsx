import { Typography } from '@mui/material'
import { useMessages } from './lib'

export function PittRules() {
  const messages = useMessages()

  return (
    <Typography color="darkgray">
      &#9679; {messages.huntsText}.
      <br />
      &#9679; {messages.coversText} 🕸.
      <br />
      &#9679; {messages.eatsText} 🩸.
      <br />
      &#9679; {messages.burnText}.
    </Typography>
  )
}
