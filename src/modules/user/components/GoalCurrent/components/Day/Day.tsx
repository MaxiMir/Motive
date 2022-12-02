import { Box } from '@mui/material'
import useSplitDate from './hooks/useSplitDate'
import DayPart from './components/DayPart'

interface DayProps {
  date: string
}

function Day({ date }: DayProps) {
  const parts = useSplitDate(date)

  return (
    <Box display="flex" alignItems="baseline" gap={1}>
      {parts.map((datePart) => (
        <DayPart datePart={datePart} key={datePart} />
      ))}
    </Box>
  )
}

export default Day
