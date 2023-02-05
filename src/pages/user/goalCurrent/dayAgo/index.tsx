import { Typography } from '@mui/material'
import { useDayAgo } from './lib'

interface DateNameProps {
  day: string
}

export function DayAgo({ day }: DateNameProps) {
  const dayAgo = useDayAgo(day)

  return (
    <Typography variant="body2" component="p">
      <b>{dayAgo}</b>
    </Typography>
  )
}