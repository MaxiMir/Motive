import { Stack, Typography } from '@mui/material'
import { format } from 'date-fns'
import Icon from 'shared/ui/Icon'

interface TaskDateProps {
  date: string
}

function TaskDate({ date }: TaskDateProps) {
  const formattedDate = format(new Date(date), 'hh:mm')

  return (
    <Stack direction="row" alignItems="center" gap={1} marginLeft={4} color="zen.silent">
      <Icon name="schedule" />
      <Typography>{formattedDate}</Typography>
    </Stack>
  )
}

export default TaskDate
