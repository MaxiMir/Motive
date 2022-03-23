import produce from 'immer'
import { format } from 'date-fns'
import { DayDto, GoalDto } from 'dto'

export const getBorders = (dates: string[], date: Date): [string, string] => {
  const formattedValue = getDateKey(date)
  const valueIndex = dates.findIndex((d) => d === formattedValue)
  const prevValue = dates[valueIndex - 1]
  const nextValue = dates[valueIndex + 1]

  return [prevValue, nextValue]
}

export const getDateKey = (date: string | Date): string =>
  format(date instanceof Date ? date : new Date(date), 'MM/dd/yyyy')

export const getGoalNextState = (goals: GoalDto[], goalId: number, day: DayDto): GoalDto[] =>
  produce(goals, (draft) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]
    draftGoal.day = day
  })
