import { TaskDto } from 'shared/api'

export function checkOnCompletedByOthers(task: TaskDto, daysGoneForOwner: number): boolean {
  return !daysGoneForOwner && task.completedByOthers && !task.completed
}
