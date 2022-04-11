import produce from 'immer'
import { format } from 'date-fns'
import { CalendarDto, DayDto, GoalDto } from 'dto'

type PartialGetDateKey = (date: Date | string) => string

export const partialGetDateKey = (formatValue: string): PartialGetDateKey => {
  return (date: Date | string) => format(date instanceof Date ? date : new Date(date), formatValue)
}

type DateMap = Record<string, number>

export const getDatesMap = (
  day: DayDto,
  calendar: CalendarDto[] | undefined,
  getDateKey: PartialGetDateKey,
): DateMap => {
  if (!calendar) {
    return { [getDateKey(day.date)]: day.id }
  }

  return calendar.reduce((acc, { id, date }) => ({ ...acc, [getDateKey(date)]: id }), {})
}

type CalendarInfo = {
  dates: string[]
  prev: string
  next: string
  min: Date
  max: Date
}

export const getCalendarInfo = (dateMap: DateMap, dateKey: string): CalendarInfo => {
  const dates = Object.keys(dateMap)
  const valueIndex = dates.findIndex((d) => d === dateKey)
  const prev = dates[valueIndex - 1]
  const next = dates[valueIndex + 1]
  const min = new Date(dates[0])
  const max = new Date(dates[dates.length - 1])

  return { dates, prev, next, min, max }
}

export const getGoalNextState = (goals: GoalDto[], goalId: number, day: DayDto): GoalDto[] =>
  produce(goals, (draft) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]
    draftGoal.day = day
  })
