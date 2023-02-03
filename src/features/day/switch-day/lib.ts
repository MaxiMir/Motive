import { format } from 'date-fns'
import { CalendarDto, DayDto } from 'shared/api'

export const getDayKey = (date: Date | string) => {
  return format(date instanceof Date ? date : new Date(date), 'yyyy-MM-dd')
}

export const getDateMap = (calendar: CalendarDto[] | undefined, day: DayDto) => {
  if (!calendar) {
    return { [getDayKey(day.date)]: day.id }
  }

  return calendar.reduce((acc, c) => ({ ...acc, [getDayKey(c.date)]: c.id }), {})
}
