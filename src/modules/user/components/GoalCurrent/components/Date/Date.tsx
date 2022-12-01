import { Box } from '@mui/material'
import useSplitDate from './hooks/useSplitDate'
import DatePart from './components/DatePart'

interface DateProps {
  date: string
}

function Date({ date }: DateProps) {
  const parts = useSplitDate(date)

  return (
    <Box display="flex" alignItems="baseline" gap={1}>
      {parts.map((datePart) => (
        <DatePart datePart={datePart} key={datePart} />
      ))}
    </Box>
  )
}

export default Date
