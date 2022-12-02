import { Typography } from '@mui/material'
import AppDecorEmoji from '@ui/AppDecorEmoji'
import useMessages from './hooks/useMessages'

function OldPittRules() {
  const messages = useMessages()

  return (
    <Typography color="darkgray">
      &#9679; {messages.huntsText}.
      <br />
      &#9679; {messages.coversText} <AppDecorEmoji name="web" />.
      <br />
      &#9679; {messages.eatsText} <AppDecorEmoji name="blood" />.
      <br />
      &#9679; {messages.burnText}.
    </Typography>
  )
}

export default OldPittRules
