import { format } from 'date-fns'
import { Box, Typography } from '@mui/material'
import AppIcon from '@ui/AppIcon'

interface TaskDateProps {
  date: string
}

function TaskDate({ date }: TaskDateProps) {
  const formattedDate = format(new Date(date), 'hh:mm')

  return (
    <Box display="flex" alignItems="center" gap={1} marginLeft={4} sx={{ color: 'zen.silent' }}>
      <AppIcon name="schedule" />
      <Typography>{formattedDate}</Typography>
    </Box>
  )
}

export default TaskDate
