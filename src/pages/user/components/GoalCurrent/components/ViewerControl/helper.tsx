import { OwnershipDto } from '@shared/api/dto'

export const checkOnCompletion = (clientOwnership: OwnershipDto, dayId: number): boolean => {
  const { page, member } = clientOwnership

  return Boolean(page && member && dayId === clientOwnership.member?.dayId)
}
