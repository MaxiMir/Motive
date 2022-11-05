import produce from 'immer'
import { CreatedGoal, GoalDto } from '@dto'

export const getNextState = (goals: GoalDto[], goal: CreatedGoal): GoalDto[] =>
  produce(goals, (draft) => {
    draft.push({ ...goal, day: goal.days[0] })
  })
