import { TaskDto } from '@dto'

export const checkOnCompletedByOther = (task: TaskDto, daysGoneForOwner: number): boolean =>
  !daysGoneForOwner && task.completedByOther && !task.completed
