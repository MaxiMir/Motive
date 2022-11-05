import { AxiosError } from 'axios'
import { useMutation, UseMutationResult } from 'react-query'
import { useIntl } from 'react-intl'
import { GoalStageDto } from '@dto'
import { GoalService } from '@services/goal'
import useSnackbar from '@hooks/useSnackbar'
import { useMutateGoals } from '@modules/user/hook'
import { getNextState } from './helper'

export const useSendStage = (onSuccess: () => void): UseMutationResult<void, AxiosError, GoalStageDto> => {
  const { formatMessage } = useIntl()
  const [goals, mutateGoals] = useMutateGoals()
  const [enqueueSnackbar] = useSnackbar()

  return useMutation(GoalService.updateStage, {
    onSuccess(_, { id }) {
      const message = formatMessage({ id: 'component.modal-completion.message' })

      mutateGoals(getNextState(goals, id))
      onSuccess()
      enqueueSnackbar({ message, severity: 'success', icon: 'stage' })
    },
  })
}
