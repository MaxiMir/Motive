import { Typography } from '@mui/material'
import { differenceInCalendarDays } from 'date-fns'

interface DateNameProps {
  day: string
}

function DayAgo({ day }: DateNameProps) {
  const ttt = differenceInCalendarDays(new Date(), Date.parse(day))
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  const [{ value }] = rtf.formatToParts(ttt, 'day') // TODO
  // fist letter to uppercase
  return (
    <Typography variant="body2" component="p">
      <b>{value}</b>
    </Typography>
  )
}

export default DayAgo
