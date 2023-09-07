import { CalendarDto } from 'shared/api'

export function getBorders(calendar: CalendarDto) {
  const min = new Date(calendar[0].date)
  const max = new Date(calendar[calendar.length - 1].date)

  return [min, max]
}
