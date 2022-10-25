import produce from 'immer'
import { GoalDto } from 'src/common/dto'

export const getNextState = (goals: GoalDto[], goalId: number): GoalDto[] =>
  produce(goals, (draft) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]
    draftGoal.stage += 1
  })
