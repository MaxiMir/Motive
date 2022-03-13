import produce from 'immer'
import { GoalDto, Member, TaskDto } from 'dto'

export const getGoalNextState = (goals: GoalDto[], goalId: number, taskId: number, completed: boolean): GoalDto[] =>
  produce(goals, (draft) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]
    const draftTask = draftGoal.day.tasks[draftGoal.day.tasks.findIndex((t) => t.id === taskId)]
    draftTask.completed = completed
  })

export const checkOnCompleted = (task: TaskDto, member?: Member): boolean =>
  !member ? task.completed : member.completedTasks.includes(task.id)
