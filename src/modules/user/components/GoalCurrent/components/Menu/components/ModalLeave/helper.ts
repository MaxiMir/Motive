import produce, { Draft } from 'immer'
import { UserPageDto } from 'src/common/dto'

export const getNextState = (page: UserPageDto, goalId: number, memberId: number, clientPage: boolean): UserPageDto =>
  produce(page, (draft: Draft<UserPageDto>) => {
    draft.content.clientMembership = draft.content.clientMembership.filter((o) => o.id !== memberId)

    if (clientPage) {
      draft.content.goals = draft.content.goals.filter((g) => g.id !== goalId)
      return
    }

    const draftGoals = draft.content.goals
    const draftGoal = draftGoals[draftGoals.findIndex((g) => g.id === goalId)]
    draftGoal.characteristic.members -= 1
  })
