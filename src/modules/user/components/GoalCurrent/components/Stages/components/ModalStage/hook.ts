import { AxiosError } from 'axios'
import { useMutation, UseMutationResult } from 'react-query'
import { useIntl } from 'react-intl'
import { GoalStageDto } from 'src/common/dto'
import { GoalService } from 'src/common/services/goal'
import useSnackbar from 'src/common/hooks/useSnackbar'
import { useMutateGoals } from '@modules/user'
import { getNextState } from './helper'
import i18n from './i18n'

export const useSendStage = (onSuccess: () => void): UseMutationResult<void, AxiosError, GoalStageDto> => {
  const { locale } = useIntl()
  const [goals, mutateGoals] = useMutateGoals()
  const [enqueueSnackbar] = useSnackbar()

  return useMutation(GoalService.updateStage, {
    onSuccess(_, { id }) {
      const { message } = i18n[locale]

      mutateGoals(getNextState(goals, id))
      onSuccess()
      enqueueSnackbar({ message, severity: 'success', icon: 'stage' })
    },
  })
}
