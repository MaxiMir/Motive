import produce from 'immer'
import { MemberDto, TaskDto } from 'shared/api'

// TODO MOVE TO BACKEND
export const redefineTasks = (tasks: TaskDto[], userMember?: MemberDto): TaskDto[] =>
  tasks.map((task) =>
    produce(task, (draft) => {
      if (!userMember) return

      draft.completed = userMember.completedTasks.includes(draft.id)
    }),
  )
