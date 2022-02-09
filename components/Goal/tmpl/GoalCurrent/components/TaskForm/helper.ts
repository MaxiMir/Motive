import produce from 'immer'
import { UserPageDto } from 'dto'

export type Options = { goalId: number; taskId: number; completed: boolean }
export type Context = { previous?: UserPageDto }

export const getNextState = (previous: UserPageDto, options: Options): UserPageDto => {
  const { goalId, taskId, completed } = options

  return produce(previous, (draft) => {
    const draftGoals = draft.content.goals
    const draftGoal = draftGoals[draftGoals.findIndex((g) => g.id === goalId)]
    const draftTask = draftGoal.day.tasks[draftGoal.day.tasks.findIndex((t) => t.id === taskId)]
    draftTask.completed = completed
  })
}
