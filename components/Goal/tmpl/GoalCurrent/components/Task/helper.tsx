import { OwnershipDto, TaskDto } from 'dto'

export const checkOnTaskForm = (dayId: number, daysGone: number, clientOwnership: OwnershipDto): boolean => {
  if (clientOwnership.page && clientOwnership.member) {
    return clientOwnership.member.dayId === dayId
  }

  return clientOwnership.goal && daysGone <= 0
}

export const checkOnCompletedByOther = (task: TaskDto, daysGone: number): boolean =>
  !daysGone && task.completedByOther && !task.completed
