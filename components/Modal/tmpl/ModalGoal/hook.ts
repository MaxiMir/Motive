import produce from 'immer'
import { useFormik } from 'formik'
import { GoalCreationDto, GoalDto } from 'dto'
import { UseFormType } from 'types'
import GoalService from 'services/GoalService'
import useSend from 'hooks/useSend'
import useSnackbar from 'hooks/useSnackbar'
import { useMutateGoals } from 'views/UserView/hook'
import { scrollToElem } from 'helpers/dom'
import schema from 'schemas/goal'

export default function useForm(onClose: () => void): UseFormType<GoalCreationDto> {
  const { isLoading, send } = useSendCreateGoal(onClose)
  const formik = useFormik<GoalCreationDto>({
    initialValues: {
      name: '',
      hashtags: '',
      stages: [],
      tasks: [{ name: '', date: undefined }],
    },
    validationSchema: schema,
    async onSubmit(data) {
      send(data)
    },
  })

  return { isLoading, formik }
}

const useSendCreateGoal = (onClose: () => void) => {
  const { enqueueSnackbar } = useSnackbar()
  const [goals, mutate] = useMutateGoals()

  return useSend(GoalService.create, {
    onSuccess(goal) {
      const { days, ...restGoalData } = goal
      mutate(
        produce(goals, (draft: GoalDto[]) => {
          draft.push({ ...restGoalData, day: days[0] })
        }),
      )
      onClose()
      enqueueSnackbar({ message: 'The goal is successfully created', severity: 'success', icon: 'goal' })
      setTimeout(() => scrollToElem(`goal-${goal.id}`), 500)
    },
  })
}
