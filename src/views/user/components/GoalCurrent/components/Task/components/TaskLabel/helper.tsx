import { TaskDto } from '@modules/task'

export const checkOnCompletedByOthers = (task: TaskDto, daysGoneForOwner: number): boolean =>
  !daysGoneForOwner && task.completedByOthers && !task.completed
