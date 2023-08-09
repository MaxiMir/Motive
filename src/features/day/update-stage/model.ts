import { produce } from 'immer'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useGoalsCache } from 'entities/user'
import { GoalDto, updateStage } from 'shared/api'
import { useSnackbar } from 'shared/ui/snackbar'

export function useUpdateStage(onSuccess: () => void) {
  const { formatMessage } = useIntl()
  const [goals, mutateGoals] = useGoalsCache()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation(updateStage, {
    onSuccess(_, { id }) {
      const message = formatMessage({ id: 'component.modal-completion.message' })
      mutateGoals(getNextState(goals, id))
      onSuccess()
      enqueueSnackbar(message, { severity: 'success', icon: '🚀' })
    },
  })
}

function getNextState(goals: GoalDto[], goalId: number) {
  return produce(goals, (draft) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]
    draftGoal.stage += 1
  })
}
