import { GoalDto, OwnershipDto } from 'dto'

export const checkOnRenderCompletion = (clientOwnership: OwnershipDto, goal: GoalDto): boolean => {
  const { page, member } = clientOwnership

  return Boolean(page && member && goal.day.id === clientOwnership.member?.dayId)
}