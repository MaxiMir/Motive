import { format } from 'date-fns'
import { Typography } from '@mui/material'
import AppBox from 'components/UI/AppBox'
import AppIcon from 'components/UI/AppIcon'

interface TaskDateProps {
  date: string
}

export default function TaskDate({ date }: TaskDateProps): JSX.Element {
  const formattedDate = format(new Date(date), 'hh:mm')

  return (
    <AppBox alignItems="center" gap={1} marginLeft={4} sx={{ color: 'zen.silent' }}>
      <AppIcon name="schedule" />
      <Typography>{formattedDate}</Typography>
    </AppBox>
  )
}
