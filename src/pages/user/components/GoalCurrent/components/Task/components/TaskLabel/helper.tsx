import { TaskDto } from 'shared/api'

export const checkOnCompletedByOthers = (task: TaskDto, daysGoneForOwner: number): boolean =>
  !daysGoneForOwner && task.completedByOthers && !task.completed
