import produce from 'immer'
import { format } from 'date-fns'
import { CalendarDto, DayDto, GoalDto } from 'dto'

type CalendarInfo = {
  dates: string[]
  prev: string
  next: string
  min: Date
  max: Date
}

export const getCalendarInfo = (datesMap: Record<string, number>, date: string): CalendarInfo => {
  const dates = Object.keys(datesMap)
  const dateKey = getDateKey(date)
  const valueIndex = dates.findIndex((d) => d === dateKey)
  const prev = dates[valueIndex - 1]
  const next = dates[valueIndex + 1]
  const min = new Date(dates[0])
  const max = new Date(dates[dates.length - 1])

  return { dates, prev, next, min, max }
}

export const getDatesMap = (day: DayDto, calendar?: CalendarDto[]): Record<string, number> => {
  if (!calendar) {
    return { [getDateKey(day.date) as string]: day.id }
  }

  return calendar.reduce((acc, { id, date }) => ({ ...acc, [getDateKey(date) as string]: id }), {})
}

export const getDateKey = (date: string | Date): string | null => {
  try {
    return format(date instanceof Date ? date : new Date(date), 'MM/dd/yyyy')
  } catch {
    return null
  }
}

export const getGoalNextState = (goals: GoalDto[], goalId: number, day: DayDto): GoalDto[] =>
  produce(goals, (draft) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]
    draftGoal.day = day
  })
