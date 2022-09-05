import { differenceInCalendarDays } from 'date-fns'

export const getDuration = (started: string, end: string): string => {
  const startDate = Date.parse(started)
  const endDate = Date.parse(end)
  const daysDifference = differenceInCalendarDays(endDate, startDate)

  return daysDifference === 1 ? '1 day' : `${daysDifference || 1} days`
}
