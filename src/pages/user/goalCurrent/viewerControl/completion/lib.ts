import { CalendarDto } from 'shared/api'

export const useNextDayId = (dayId: number, calendar: CalendarDto[]) => {
  const index = calendar.findIndex((c) => c.id === dayId)

  return calendar[index + 1]?.id
}
