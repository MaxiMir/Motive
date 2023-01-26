import { Typography } from '@mui/material'
import DecorEmoji from '@shared/ui/DecorEmoji'
import { useMessages } from './lib'

export function OldPittRules() {
  const messages = useMessages()

  return (
    <Typography color="darkgray">
      &#9679; {messages.huntsText}.
      <br />
      &#9679; {messages.coversText} <DecorEmoji name="web" />.
      <br />
      &#9679; {messages.eatsText} <DecorEmoji name="blood" />.
      <br />
      &#9679; {messages.burnText}.
    </Typography>
  )
}
