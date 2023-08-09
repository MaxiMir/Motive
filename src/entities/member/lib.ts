import { MemberDto } from 'shared/api'

export function findMember(
  membership: MemberDto[],
  goalId: number,
  userId?: number,
): MemberDto | undefined {
  return !userId ? undefined : membership.find((m) => m.userId === userId && m.goalId === goalId)
}
