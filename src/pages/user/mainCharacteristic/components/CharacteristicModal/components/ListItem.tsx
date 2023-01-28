import { Stack, Typography } from '@mui/material'
import Emoji from 'shared/ui/Emoji'

interface ListItemProps {
  name: JSX.Element | string
}

function ListItem({ name }: ListItemProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={1} paddingY="4px">
      <Emoji name="barber" onlyEmoji />
      <Typography>{name}</Typography>
    </Stack>
  )
}

export default ListItem
