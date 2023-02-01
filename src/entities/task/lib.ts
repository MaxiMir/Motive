import produce from 'immer'
import { MemberDto, TaskDto } from 'shared/api'

export const redefineTasks = (tasks: TaskDto[], userMember?: MemberDto) =>
  tasks.map((task) =>
    produce(task, (draft) => {
      if (!userMember) return

      draft.completed = userMember.completedTasks.includes(draft.id)
    }),
  )
