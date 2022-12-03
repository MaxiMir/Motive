import { Box } from '@mui/material'
import useFormatDate from '@hooks/useFormatDate'
import DatePart from './components/DatePart'

interface DateProps {
  date: string
}

function Date({ date }: DateProps) {
  const formatDate = useFormatDate()
  const formattedDate = formatDate(date, { day: 'numeric', month: 'long' })
  const parts = formattedDate.split(' ')

  return (
    <Box display="flex" alignItems="baseline" gap={1}>
      {parts.map((datePart) => (
        <DatePart datePart={datePart} key={datePart} />
      ))}
    </Box>
  )
}

export default Date
