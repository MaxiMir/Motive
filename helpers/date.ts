import { addDays, format } from 'date-fns'

export const getCurrentDateWithZeroTime = (): Date => {
  const date = new Date()

  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)

  return date
}

export const toISODateWithZeroTime = (date: Date): string => `${format(date, 'yyyy-MM-dd')}T00:00:00.000Z`

export const getTomorrow = (): Date => addDays(new Date(), 1)
