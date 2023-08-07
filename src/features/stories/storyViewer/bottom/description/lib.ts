import { differenceInCalendarDays } from 'date-fns'

export function getDuration(started: string, end: string) {
  const startDate = Date.parse(started)
  const endDate = Date.parse(end)

  return differenceInCalendarDays(endDate, startDate)
}
