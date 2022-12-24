import { TaskDto } from '@features/task'

type CheckOnCompletedByOthers = (task: TaskDto, daysGoneForOwner: number) => boolean

export const checkOnCompletedByOthers: CheckOnCompletedByOthers = (task, daysGoneForOwner) =>
  !daysGoneForOwner && task.completedByOthers && !task.completed
