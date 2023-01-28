import produce from 'immer'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useSnackbar } from 'entities/snackbar'
import { useMutateGoals } from 'entities/user'
import { GoalDto, updateStage } from 'shared/api'

const getNextState = (goals: GoalDto[], goalId: number) =>
  produce(goals, (draft) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]
    draftGoal.stage += 1
  })

export const useSendStage = (onSuccess: () => void) => {
  const { formatMessage } = useIntl()
  const [goals, mutateGoals] = useMutateGoals()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation(updateStage, {
    onSuccess(_, { id }) {
      const message = formatMessage({ id: 'component.modal-completion.message' })
      mutateGoals(getNextState(goals, id))
      onSuccess()
      enqueueSnackbar({ message, severity: 'success', icon: 'stage' })
    },
  })
}
