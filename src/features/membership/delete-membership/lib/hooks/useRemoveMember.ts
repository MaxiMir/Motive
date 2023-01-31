import produce, { Draft } from 'immer'
import { useIntl } from 'react-intl'
import { useMutation, useQueryClient } from 'react-query'
import { useUserContext, useClient } from 'entities/user'
import { UserPageDto, deleteMember } from 'shared/api'
import { useSnackbar } from 'shared/ui/snackbar'

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

export const useRemoveMember = (goalId: number, clientPage: boolean) => {
  const client = useClient()
  const { formatMessage } = useIntl()
  const { nickname } = useUserContext()
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation(deleteMember, {
    onSuccess(_, id) {
      if (!client) return

      const message = formatMessage({ id: 'page.user.modal-goal.message' })
      queryClient.setQueriesData<UserPageDto | undefined>(
        ['page', nickname],
        (page) => page && getNextState(page, goalId, id, clientPage),
      )
      enqueueSnackbar({ message, severity: 'success', icon: '🧞‍♂️️‍' })
    },
  })
}
