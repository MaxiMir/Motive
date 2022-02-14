import produce from 'immer'
import { CreatedGoal, GoalDto } from 'dto'

export const getGoalNextState = (goals: GoalDto[], goal: CreatedGoal): GoalDto[] => {
  const { days, ...restGoalData } = goal

  return produce(goals, (draft: GoalDto[]) => {
    draft.push({ ...restGoalData, day: days[0] })
  })
}
