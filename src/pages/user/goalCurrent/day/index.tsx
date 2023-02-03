import { Stack } from '@mui/material'
import { useFormatDate } from 'shared/lib/hooks'
import DatePart from './dayPart'

interface DayProps {
  date: string
}

export function Day({ date }: DayProps) {
  const formatDate = useFormatDate()
  const formattedDate = formatDate(date, { day: 'numeric', month: 'long' })
  const parts = formattedDate.split(' ')

  return (
    <Stack direction="row" alignItems="baseline" gap={1}>
      {parts.map((datePart) => (
        <DatePart datePart={datePart} key={datePart} />
      ))}
    </Stack>
  )
}
