import { Box, Typography } from '@mui/material'
import AppEmoji from '@ui/AppEmoji'

interface ListItemProps {
  name: JSX.Element | string
}

function ListItem({ name }: ListItemProps) {
  return (
    <Box display="flex" alignItems="center" gap={1} sx={{ paddingY: '0.25rem' }}>
      <AppEmoji name="barber" onlyEmoji />
      <Typography>{name}</Typography>
    </Box>
  )
}

export default ListItem
