import produce from 'immer'
import { GoalDto, GoalStage } from 'dto'
import useSend, { UseSend } from 'hooks/useSend'
import GoalService from 'services/GoalService'
import useSnackbar from 'hooks/useSnackbar'
import { useMutateGoals } from 'views/UserView/hook'

export const useSendStage = (goal: GoalDto, onClose: () => void): UseSend<GoalStage> => {
  const [goals, mutateGoals] = useMutateGoals()
  const { enqueueSnackbar } = useSnackbar()

  return useSend(GoalService.updateStage, {
    onSuccess() {
      mutateGoals(
        produce(goals, (draft: GoalDto[]) => {
          const draftGoal = draft[draft.findIndex((g) => g.id === goal.id)]
          draftGoal.stage += 1
        }),
      )
      onClose()
      enqueueSnackbar({
        message: 'The stage for the next day has been successfully set',
        severity: 'success',
        icon: 'stage',
      })
    },
  })
}
