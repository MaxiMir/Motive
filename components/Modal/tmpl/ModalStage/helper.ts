import produce from 'immer'
import { GoalDto } from 'dto'

export const getNextState = (prev: GoalDto[], goal: GoalDto): GoalDto[] =>
  produce(prev, (draft: GoalDto[]) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === goal.id)]
    draftGoal.stage += 1
  })
