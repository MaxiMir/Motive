import produce from 'immer'
import { UserPageDto, MemberDto } from '@dto'

export const getGoalNextState = (
  page: UserPageDto,
  goalId: number,
  taskId: number,
  completed: boolean,
  clientMember?: MemberDto,
): UserPageDto =>
  produce(page, (draft) => {
    if (!clientMember) {
      const draftGoals = draft.content.goals
      const draftGoal = draftGoals[draftGoals.findIndex((g) => g.id === goalId)]
      const draftTask = draftGoal.day.tasks[draftGoal.day.tasks.findIndex((t) => t.id === taskId)]
      draftTask.completed = completed
      return
    }

    const draftMember = draft.content.userMembership.find((m) => m.id === clientMember.id)

    if (!draftMember) return

    draftMember.completedTasks = completed
      ? [...draftMember.completedTasks, taskId]
      : draftMember.completedTasks.filter((id) => id === taskId)
  })
