import produce from 'immer'
import { AxiosError } from 'axios'
import { useMutation, UseMutationResult } from 'react-query'
import { GoalDto, MemberDto, UpdateMemberDto } from 'dto'
import { clickOnElem } from 'helpers/dom'
import { useMutateUserPage } from 'views/UserView/hook'
import MemberService from 'services/MemberService'

export const useSendEndOfDay = (goal: GoalDto): UseMutationResult<MemberDto, AxiosError, UpdateMemberDto> => {
  const [page, mutatePage] = useMutateUserPage()

  return useMutation(MemberService.update, {
    onSuccess(response) {
      mutatePage(
        produce(page, (draft) => {
          const draftMember = draft.content.clientMembership.find((m) => m.id === response.id)

          if (!draftMember) return

          draftMember.dayId = response.dayId
          draftMember.lastEndOfDay = response.lastEndOfDay

          setTimeout(() => clickOnElem(`next-${goal.id}`), 1)
        }),
      )
    },
  })
}
