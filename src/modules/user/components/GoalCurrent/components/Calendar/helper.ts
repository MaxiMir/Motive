import { format } from 'date-fns'
import { CalendarDto } from '@dto'

export const partialGetDateKey = (formatValue: string) => {
  return (date: Date | string) => format(date instanceof Date ? date : new Date(date), formatValue)
}

export const getBorders = (calendar: CalendarDto[]): [min?: Date, max?: Date] => {
  if (!calendar) {
    return [undefined, undefined]
  }

  const min = new Date(calendar[0].date)
  const max = new Date(calendar[calendar.length - 1].date)

  return [min, max]
}
