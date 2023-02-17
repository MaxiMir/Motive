import { Stack, Typography } from '@mui/material'
import { useMessages } from './lib'

export function SupportRules() {
  const messages = useMessages()

  return (
    <Stack color="zen.silent">
      <Typography>{messages.goalText} 💎.</Typography>
      <Typography>{messages.tiredText} 😮‍💨.</Typography>
      <Typography>{messages.thereforeText}:</Typography>
      <Typography>&#9679; {messages.adviceText};</Typography>
      <Typography>&#9679; {messages.wordsText}.</Typography>
    </Stack>
  )
}
