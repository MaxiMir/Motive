import { Stack } from '@mui/material'
import { useFormatDate } from 'shared/lib/hooks'
import Icon from 'shared/ui/Icon'
import DatePart from './dayPart'

interface DayProps {
  date: string
  icon: string
}

export function Day({ icon, date }: DayProps) {
  const formatDate = useFormatDate()
  const formattedDate = formatDate(date, { day: 'numeric', month: 'long' })
  const parts = formattedDate.split(' ')

  return (
    <Stack direction="row" alignItems="center" gap={1} alignSelf="center">
      <Icon name={icon} />
      {parts.map((datePart) => (
        <DatePart datePart={datePart} key={datePart} />
      ))}
    </Stack>
  )
}
