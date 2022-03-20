import { AxiosError } from 'axios'
import { useMutation, UseMutationResult } from 'react-query'
import { GoalStageDto } from 'dto'
import GoalService from 'services/GoalService'
import useSnackbar from 'hooks/useSnackbar'
import { useMutateGoals } from 'views/UserView/hook'
import { getNextState } from './helper'

type UseSendStage = UseMutationResult<void, AxiosError, GoalStageDto>

export const useSendStage = (onSuccess: () => void): UseSendStage => {
  const [goals, mutateGoals] = useMutateGoals()
  const [enqueueSnackbar] = useSnackbar()

  return useMutation(GoalService.updateStage, {
    onSuccess(_, { id }) {
      mutateGoals(getNextState(goals, id))
      onSuccess()
      enqueueSnackbar({
        message: 'The stage for the next day has been successfully set',
        severity: 'success',
        icon: 'stage',
      })
    },
  })
}
