import produce from 'immer'
import { DayDto, GoalDto } from 'dto'

export const getGoalNextState = (goals: GoalDto[], goalId: number, day: DayDto): GoalDto[] =>
  produce(goals, (draft: GoalDto[]) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]
    draftGoal.calendar.push({ id: day.id, date: day.date })
    draftGoal.day = day
  })
