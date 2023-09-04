import { addDays, differenceInCalendarDays, formatISO, startOfDay } from 'date-fns'
import { CalendarDto } from 'shared/api'

export function getInitialDate(calendar: CalendarDto) {
  const today = new Date()
  const lastDate = calendar.at(-1)?.date
  const parsedDate = lastDate && Date.parse(lastDate)
  const useToday = !parsedDate || differenceInCalendarDays(parsedDate, today) < 0

  return formatISO(useToday ? today : startOfDay(addDays(parsedDate, 1)))
}
