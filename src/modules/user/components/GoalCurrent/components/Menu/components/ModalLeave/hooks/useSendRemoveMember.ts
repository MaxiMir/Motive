import produce, { Draft } from 'immer'
import { useIntl } from 'react-intl'
import { useMutation, useQueryClient } from 'react-query'
import { UserPageDto } from '@dto'
import { useUserContext } from '@modules/user/hooks'
import MemberService from '@services/member'
import useClient from '@hooks/useClient'
import useSnackbar from '@hooks/useSnackbar'

const getNextState = (page: UserPageDto, goalId: number, memberId: number, clientPage: boolean) =>
  produce(page, (draft: Draft<UserPageDto>) => {
    draft.clientMembership = draft.clientMembership.filter((o) => o.id !== memberId)

    if (clientPage) {
      draft.goals = draft.goals.filter((g) => g.id !== goalId)
      return
    }

    const draftGoals = draft.goals
    const draftGoal = draftGoals[draftGoals.findIndex((g) => g.id === goalId)]
    draftGoal.characteristic.members -= 1
  })

export const useSendRemoveMember = (goalId: number, clientPage: boolean) => {
  const { formatMessage } = useIntl()
  const client = useClient()
  const { nickname } = useUserContext()
  const queryClient = useQueryClient()
  const [enqueueSnackbar] = useSnackbar()

  return useMutation(MemberService.delete, {
    onSuccess(_, id) {
      if (!client) return

      const message = formatMessage({ id: 'page.user.modal-goal.message' })
      queryClient.setQueriesData<UserPageDto | undefined>(
        nickname,
        (page) => page && getNextState(page, goalId, id, clientPage),
      )
      enqueueSnackbar({ message, severity: 'success', icon: 'speaker' })
    },
  })
}
