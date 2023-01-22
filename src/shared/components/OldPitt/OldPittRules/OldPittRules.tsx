import { Typography } from '@mui/material'
import DecorEmoji from '@ui/DecorEmoji'
import { useMessages } from './hooks/useMessages'

function OldPittRules() {
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

export default OldPittRules
