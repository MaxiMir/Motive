import produce from 'immer'
import { GoalDto, MemberDto, UserPageDto } from 'dto'

export const getNextState = (page: UserPageDto, goals: GoalDto[]): UserPageDto =>
  produce(page, (draft) => {
    draft.content.goals = goals
  })

export const getMember = (goalId: number, membership: MemberDto[], userId?: number): MemberDto | undefined =>
  (userId && membership.find((m) => m.userId === userId && m.goalId === goalId)) || undefined
