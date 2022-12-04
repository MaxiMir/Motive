import { Typography } from '@mui/material'
import useDayAgo from './hooks/useDayAgo'

interface DateNameProps {
  day: string
}

function DayAgo({ day }: DateNameProps) {
  const dayAgo = useDayAgo(day)

  return (
    <Typography variant="body2" component="p">
      <b>{dayAgo}</b>
    </Typography>
  )
}

export default DayAgo
