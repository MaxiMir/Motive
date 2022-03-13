import produce from 'immer'
import { AxiosError } from 'axios'
import { useMutation, UseMutationResult } from 'react-query'
import { GoalDto, GoalStageDto } from 'dto'
import GoalService from 'services/GoalService'
import useSnackbar from 'hooks/useSnackbar'
import { useMutateGoals } from 'views/UserView/hook'

type UseSendStage = UseMutationResult<void, AxiosError, GoalStageDto>

export const useSendStage = (goal: GoalDto, onSuccess: () => void): UseSendStage => {
  const [goals, mutateGoals] = useMutateGoals()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation(GoalService.updateStage, {
    onSuccess() {
      mutateGoals(
        produce(goals, (draft) => {
          const draftGoal = draft[draft.findIndex((g) => g.id === goal.id)]
          draftGoal.stage += 1
        }),
      )
      onSuccess()
      enqueueSnackbar({
        message: 'The stage for the next day has been successfully set',
        severity: 'success',
        icon: 'stage',
      })
    },
  })
}
