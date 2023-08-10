import { produce, Draft } from 'immer'
import { useIntl } from 'react-intl'
import { useMutation, useQueryClient } from 'react-query'
import { useUserContext } from 'entities/user'
import { useViewer } from 'entities/viewer'
import { UserPageDto, deleteMember } from 'shared/api'
import { useSnackbar } from 'shared/ui/snackbar'

export function useDeleteMember(goalId: number, viewerPage: boolean) {
  const viewer = useViewer()
  const { formatMessage } = useIntl()
  const { nickname } = useUserContext()
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation(deleteMember, {
    onSuccess() {
      if (!viewer) return

      const message = formatMessage({ id: 'page.user.modal-goal.message' })
      queryClient.setQueriesData<UserPageDto | undefined>(
        ['page', nickname],
        (page) => page && getNextState(page, goalId, viewerPage),
      )
      enqueueSnackbar(message, { severity: 'success', icon: '🧞‍♂️️‍' })
    },
  })
}

function getNextState(page: UserPageDto, goalId: number, viewerPage: boolean) {
  return produce(page, (draft: Draft<UserPageDto>) => {
    if (viewerPage) {
      draft.goals = draft.goals.filter((g) => g.id !== goalId)
      return
    }

    const draftGoal = draft.goals[draft.goals.findIndex((g) => g.id === goalId)]
    draftGoal.members -= 1
  })
}
