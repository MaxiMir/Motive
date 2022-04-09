import { format } from 'date-fns'
import { Box, Typography } from '@mui/material'
import AppIcon from 'components/UI/AppIcon'

interface TaskDateProps {
  date: string
}

export default function TaskDate({ date }: TaskDateProps): JSX.Element {
  const formattedDate = format(new Date(date), 'hh:mm')

  return (
    <Box display="flex" alignItems="center" gap={1} marginLeft={4} sx={{ color: 'zen.silent' }}>
      <AppIcon name="schedule" />
      <Typography>{formattedDate}</Typography>
    </Box>
  )
}
