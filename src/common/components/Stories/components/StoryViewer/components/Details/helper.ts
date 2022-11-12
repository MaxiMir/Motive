import { differenceInCalendarDays } from 'date-fns'

export const getDuration = (started: string, end: string): number => {
  const startDate = Date.parse(started)
  const endDate = Date.parse(end)
  return differenceInCalendarDays(endDate, startDate)
}
