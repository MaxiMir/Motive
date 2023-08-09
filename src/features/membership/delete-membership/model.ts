import { produce, Draft } from 'immer'
import { useIntl } from 'react-intl'
import { useMutation, useQueryClient } from 'react-query'
import { useUserContext } from 'entities/user'
import { useClient } from 'entities/viewer'
import { UserPageDto, deleteMember } from 'shared/api'
import { useSnackbar } from 'shared/ui/snackbar'

export function useRemoveMember(goalId: number, clientPage: boolean) {
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
      enqueueSnackbar(message, { severity: 'success', icon: '🧞‍♂️️‍' })
    },
  })
}

function getNextState(page: UserPageDto, goalId: number, memberId: number, clientPage: boolean) {
  return produce(page, (draft: Draft<UserPageDto>) => {
    draft.clientMembership = draft.clientMembership.filter((o) => o.id !== memberId)

    if (clientPage) {
      draft.goals = draft.goals.filter((g) => g.id !== goalId)
      return
    }

    const draftGoal = draft.goals[draft.goals.findIndex((g) => g.id === goalId)]
    draftGoal.members -= 1
  })
}
