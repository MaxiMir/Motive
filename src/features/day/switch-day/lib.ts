import { format } from 'date-fns'
import { CalendarDto } from 'shared/api'

export function getDayKey(date: Date | string) {
  return format(date instanceof Date ? date : new Date(date), 'yyyy-MM-dd')
}

export function getDateMap(calendar: CalendarDto): Record<string, number> {
  return calendar.reduce((acc, c) => ({ ...acc, [getDayKey(c.date)]: c.id }), {})
}
