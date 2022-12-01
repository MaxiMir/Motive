import { format } from 'date-fns'
import { CalendarDto } from '@dto'

export const partialGetDateKey = (formatValue: string) => {
  return (date: Date | string) => format(date instanceof Date ? date : new Date(date), formatValue)
}

export const getToggleDates = (dates: string[], dateKey: string): [string, string] => {
  const valueIndex = dates.findIndex((d) => d === dateKey)
  const prev = dates[valueIndex - 1]
  const next = dates[valueIndex + 1]

  return [prev, next]
}

export const getBorders = (calendar: CalendarDto[]): [Date | undefined, Date | undefined] => {
  if (!calendar) {
    return [undefined, undefined]
  }

  const min = new Date(calendar[0].date)
  const max = new Date(calendar[calendar.length - 1].date)

  return [min, max]
}
