import { findMember } from 'entities/member'
import { GoalDto, MemberDto, OwnershipDto } from 'shared/api'

// TODO SPLIT
export const getClientOwnership = (
  goal: GoalDto,
  clientId: number | undefined,
  clientPage: boolean,
  clientMembership: MemberDto[],
): OwnershipDto => {
  const { id, owner } = goal
  const clientGoal = owner.id === clientId
  const clientMember = findMember(id, clientMembership, clientId)

  return { page: clientPage, goal: clientGoal, member: clientMember }
}
