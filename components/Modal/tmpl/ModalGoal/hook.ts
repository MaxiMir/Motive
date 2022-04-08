import { FormikProps, useFormik } from 'formik'
import { useMutation } from 'react-query'
import { CreateGoalDto } from 'dto'
import schema from 'schemas/goal'
import GoalService from 'services/GoalService'
import useSnackbar from 'hooks/useSnackbar'
import useLocale from 'hooks/useLocale'
import { useMutateGoals } from 'views/UserView/hook'
import { getToday, getTomorrow } from 'helpers/date'
import { scrollToElem } from 'helpers/dom'
import { getNextState } from './helper'
import i18n from './i18n'

export default function useForm(onSuccess: () => void): FormikProps<CreateGoalDto> {
  const { mutateAsync } = useSendCreateGoal(onSuccess)

  return useFormik<CreateGoalDto>({
    initialValues: {
      started: getToday(),
      name: '',
      hashtags: '',
      stages: [],
      tasksDate: getTomorrow(),
      tasks: [{ name: '', date: undefined }],
    },
    validationSchema: schema,
    async onSubmit(data) {
      await mutateAsync(data)
    },
  })
}

const useSendCreateGoal = (onSuccess: () => void) => {
  const { locale } = useLocale()
  const [enqueueSnackbar] = useSnackbar()
  const [goals, mutateGoal] = useMutateGoals()
  const { message } = i18n[locale]

  return useMutation(GoalService.create, {
    onSuccess(goal) {
      mutateGoal(getNextState(goals, goal))
      onSuccess()
      enqueueSnackbar({ message, severity: 'success', icon: 'goal' })
      setTimeout(() => scrollToElem(`goal-${goal.id}`), 500)
    },
  })
}
