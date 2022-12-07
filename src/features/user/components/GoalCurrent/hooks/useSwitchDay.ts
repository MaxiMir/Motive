import { format } from 'date-fns'
import { CalendarDto, DayDto, GoalDto } from '@dto'
import { useChangeDay } from './useChangeDay'

const getDayKey = (date: Date | string) => {
  return format(date instanceof Date ? date : new Date(date), 'yyyy-MM-dd')
}

const getDateMap = (calendar: CalendarDto[] | undefined, day: DayDto) => {
  if (!calendar) {
    return { [getDayKey(day.date)]: day.id }
  }

  return calendar.reduce((acc, c) => ({ ...acc, [getDayKey(c.date)]: c.id }), {})
}

export const useSwitchDay = (goal: GoalDto) => {
  const { id, day, calendar } = goal
  const { isLoading, mutate } = useChangeDay(id)
  const dateMap = getDateMap(calendar, day)
  const dates = Object.keys(dateMap)
  const dayKey = getDayKey(day.date)
  const dayIndex = dates.findIndex((d) => d === dayKey)
  const prev = dates[dayIndex - 1]
  const next = dates[dayIndex + 1]

  const onChangeDate = (value: Date | string | null) => {
    if (!value) return

    const valueKey = getDayKey(value)

    mutate(dateMap[valueKey])
  }

  const shouldDisableDate = (value: Date) => {
    const valueKey = getDayKey(value)

    return !dates.includes(valueKey)
  }

  return {
    isLoading,
    prev,
    next,
    onChangeDate,
    shouldDisableDate,
  }
}
