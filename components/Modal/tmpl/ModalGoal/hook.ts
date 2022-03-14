import produce from 'immer'
import { FormikProps, useFormik } from 'formik'
import { useMutation } from 'react-query'
import { CreateGoalDto } from 'dto'
import GoalService from 'services/GoalService'
import useSnackbar from 'hooks/useSnackbar'
import { useMutateGoals } from 'views/UserView/hook'
import { getToday, getTomorrow } from 'helpers/date'
import { scrollToElem } from 'helpers/dom'
import schema from 'schemas/goal'

export default function useForm(onSuccess: () => void): FormikProps<CreateGoalDto> {
  const { mutateAsync } = useSendCreateGoal(onSuccess)

  return useFormik<CreateGoalDto>({
    initialValues: {
      started: getToday(),
      name: '',
      hashtags: '',
      stages: [],
      date: getTomorrow(),
      tasks: [{ name: '', date: undefined }],
    },
    validationSchema: schema,
    async onSubmit(data) {
      await mutateAsync(data)
    },
  })
}

const useSendCreateGoal = (onSuccess: () => void) => {
  const [enqueueSnackbar] = useSnackbar()
  const [goals, mutateGoal] = useMutateGoals()

  return useMutation(GoalService.create, {
    onSuccess(goal) {
      mutateGoal(
        produce(goals, (draft) => {
          draft.push({ ...goal, day: goal.days[0] })
        }),
      )
      onSuccess()
      enqueueSnackbar({ message: 'The goal is successfully created', severity: 'success', icon: 'goal' })
      setTimeout(() => scrollToElem(`goal-${goal.id}`), 500)
    },
  })
}
