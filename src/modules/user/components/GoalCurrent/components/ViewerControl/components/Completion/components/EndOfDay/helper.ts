import produce, { Draft } from 'immer'
import { MemberDto, UserPageDto } from '@dto'

export const getNextState = (page: UserPageDto, member: MemberDto): UserPageDto =>
  produce(page, (draft: Draft<UserPageDto>) => {
    const draftMember = draft.content.clientMembership.find((m) => m.id === member.id)

    if (!draftMember) return

    draftMember.dayId = member.dayId
    draftMember.updated = member.updated
  })
