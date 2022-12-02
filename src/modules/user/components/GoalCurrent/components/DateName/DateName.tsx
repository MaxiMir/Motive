import { Typography } from '@mui/material'
import useMessages from './hooks/useMessages'

interface DateNameProps {
  daysGone: number
}

function DateName({ daysGone }: DateNameProps) {
  const messages = useMessages(daysGone)

  return (
    <Typography variant="h6" component="p">
      <b>{messages.name}</b>
    </Typography>
  )
}

export default DateName
