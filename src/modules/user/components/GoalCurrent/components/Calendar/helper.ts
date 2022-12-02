import { CalendarDto } from '@dto'

export const getBorders = (calendar?: CalendarDto[]): [min?: Date, max?: Date] => {
  if (!calendar) {
    return [undefined, undefined]
  }

  const min = new Date(calendar[0].date)
  const max = new Date(calendar[calendar.length - 1].date)

  return [min, max]
}
