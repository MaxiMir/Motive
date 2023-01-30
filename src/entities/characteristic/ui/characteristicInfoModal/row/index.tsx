import { Stack, Typography } from '@mui/material'
import Emoji from 'shared/ui/Emoji'

interface RowProps {
  text: string
}

export function Row({ text }: RowProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={1} paddingY="4px">
      <Emoji name="barber" onlyEmoji />
      <Typography>{text}</Typography>
    </Stack>
  )
}
