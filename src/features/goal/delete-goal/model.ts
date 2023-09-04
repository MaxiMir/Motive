import { produce } from 'immer'
import { flushSync } from 'react-dom'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useUserPageCache } from 'entities/user'
import { deleteGoal } from 'shared/api'
import { useSnackbar } from 'shared/ui/snackbar'

export function useDeleteGoal(goalId: number) {
  const { formatMessage } = useIntl()
  const { enqueueSnackbar } = useSnackbar()
  const [page, mutatePage] = useUserPageCache()

  return useMutation(() => deleteGoal(goalId), {
    onSuccess() {
      const message = formatMessage({ id: 'page.user.modal-goal.message-deleted' })

      flushSync(() => {
        const nextState = produce(page, (draft) => {
          draft.goals = draft.goals.filter((goal) => goal.id !== goalId)
        })
        mutatePage(nextState)
      })
      enqueueSnackbar(message, { severity: 'success', icon: '💎' })
    },
  })
}
