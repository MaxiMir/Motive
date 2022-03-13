import produce from 'immer'
import { GoalDto } from 'dto'

export const getGoalNextState = (goals: GoalDto[], goalId: number, taskId: number, completed: boolean): GoalDto[] =>
  produce(goals, (draft) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]
    const draftTask = draftGoal.day.tasks[draftGoal.day.tasks.findIndex((t) => t.id === taskId)]
    draftTask.completed = completed
  })
