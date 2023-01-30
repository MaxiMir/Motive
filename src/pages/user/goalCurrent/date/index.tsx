import { Stack } from '@mui/material'
import { useFormatDate } from 'shared/lib/hooks'
import DatePart from './datePart'

interface DateProps {
  date: string
}

export function Date({ date }: DateProps) {
  const formatDate = useFormatDate()
  const formattedDate = formatDate(date, { day: 'numeric', month: 'long' })
  const parts = formattedDate.split(' ')

  return (
    <Stack direction="row" alignItems="baseline" spacing={1}>
      {parts.map((datePart) => (
        <DatePart datePart={datePart} key={datePart} />
      ))}
    </Stack>
  )
}
