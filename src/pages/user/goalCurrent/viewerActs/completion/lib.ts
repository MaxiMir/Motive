import { CalendarDto } from 'shared/api'

export function getNextDayId(dayId: number, calendar: CalendarDto[]) {
  const index = calendar.findIndex((c) => c.id === dayId)

  return calendar[index + 1]?.id
}
