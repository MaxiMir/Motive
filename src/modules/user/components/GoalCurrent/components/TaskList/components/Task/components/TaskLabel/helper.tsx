import { TaskDto } from 'src/common/dto'

export const checkOnCompletedByOther = (task: TaskDto, daysGoneForOwner: number): boolean =>
  !daysGoneForOwner && task.completedByOther && !task.completed
