import produce from 'immer'
import { CreatedGoal, GoalDto } from 'src/common/dto'

export const getNextState = (goals: GoalDto[], goal: CreatedGoal): GoalDto[] =>
  produce(goals, (draft) => {
    draft.push({ ...goal, day: goal.days[0] })
  })
