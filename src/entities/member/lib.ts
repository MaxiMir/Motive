import { MemberDto } from 'shared/api'

export const findMember = (
  goalId: number,
  membership: MemberDto[],
  userId?: number,
): MemberDto | undefined => {
  return !userId ? undefined : membership.find((m) => m.userId === userId && m.goalId === goalId)
}
