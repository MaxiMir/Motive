import { AxiosError } from 'axios'
import { useMutation, UseMutationResult } from 'react-query'
import { GoalDto, GoalStageDto } from 'dto'
import GoalService from 'services/GoalService'
import useSnackbar from 'hooks/useSnackbar'
import { useMutateGoals } from 'views/UserView/hook'
import { getNextState } from './helper'

type UseSendStage = UseMutationResult<void, AxiosError, GoalStageDto>

export const useSendStage = (goal: GoalDto, onSuccess: () => void): UseSendStage => {
  const [goals, mutate] = useMutateGoals()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation(GoalService.updateStage, {
    onSuccess() {
      mutate(getNextState(goals, goal))
      onSuccess()
      enqueueSnackbar({
        message: 'The stage for the next day has been successfully set',
        severity: 'success',
        icon: 'stage',
      })
    },
  })
}
