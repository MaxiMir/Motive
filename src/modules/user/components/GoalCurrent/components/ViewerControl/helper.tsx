import { OwnershipDto } from '@features/member'

type CheckOnCompletion = (clientOwnership: OwnershipDto, dayId: number) => boolean

export const checkOnCompletion: CheckOnCompletion = (clientOwnership, dayId) => {
  const { page, member } = clientOwnership

  return Boolean(page && member && dayId === clientOwnership.member?.dayId)
}
