import produce from 'immer'
import { DayDto, GoalDto } from 'src/common/dto'

export const getNextState = (goals: GoalDto[], day: DayDto, goalId: number): GoalDto[] =>
  produce(goals, (draft) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]
    draftGoal.calendar.push({ id: day.id, date: day.date })
    draftGoal.day = day
  })
