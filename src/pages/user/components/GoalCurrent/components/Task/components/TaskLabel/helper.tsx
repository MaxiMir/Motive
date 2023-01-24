import { TaskDto } from '@entities/task'

export const checkOnCompletedByOthers = (task: TaskDto, daysGoneForOwner: number): boolean =>
  !daysGoneForOwner && task.completedByOthers && !task.completed
