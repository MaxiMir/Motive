import { AxiosError } from 'axios'
import { useMutation, UseMutationResult } from 'react-query'
import { GoalStageDto } from 'dto'
import GoalService from 'services/GoalService'
import useSnackbar from 'hooks/useSnackbar'
import useLocale from 'hooks/useLocale'
import { useMutateGoals } from 'views/UserView/hook'
import { getNextState } from './helper'
import i18n from './i18n'

type UseSendStage = UseMutationResult<void, AxiosError, GoalStageDto>

export const useSendStage = (onSuccess: () => void): UseSendStage => {
  const { locale } = useLocale()
  const [goals, mutateGoals] = useMutateGoals()
  const [enqueueSnackbar] = useSnackbar()

  return useMutation(GoalService.updateStage, {
    onSuccess(_, { id }) {
      const { message } = i18n[locale]

      mutateGoals(getNextState(goals, id))
      onSuccess()
      enqueueSnackbar({
        message,
        severity: 'success',
        icon: 'stage',
      })
    },
  })
}
