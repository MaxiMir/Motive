import { Box, Typography } from '@mui/material'
import AppEmoji from 'components/ui/AppEmoji'

interface ListItemProps {
  name: JSX.Element | string
}

export default function ListItem({ name }: ListItemProps) {
  return (
    <Box display="flex" alignItems="center" gap={1} sx={{ paddingY: '4px' }}>
      <AppEmoji name="barber" onlyEmoji />
      <Typography>{name}</Typography>
    </Box>
  )
}
