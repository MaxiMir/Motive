import { format } from 'date-fns'
import { Stack, Typography } from '@mui/material'
import AppIcon from '@ui/AppIcon'

interface TaskDateProps {
  date: string
}

function TaskDate({ date }: TaskDateProps) {
  const formattedDate = format(new Date(date), 'hh:mm')

  return (
    <Stack direction="row" alignItems="center" spacing={1} marginLeft={4} color="zen.silent">
      <AppIcon name="schedule" />
      <Typography>{formattedDate}</Typography>
    </Stack>
  )
}

export default TaskDate
