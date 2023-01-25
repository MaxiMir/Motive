import { Stack } from '@mui/material'
import { useFormatDate } from '@shared/lib/hooks'
import DatePart from './components/DatePart'

interface DateProps {
  date: string
}

function Date({ date }: DateProps) {
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

export default Date
