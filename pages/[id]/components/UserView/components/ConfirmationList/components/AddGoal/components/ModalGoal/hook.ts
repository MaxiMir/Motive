import { FormikProps, useFormik } from 'formik'
import { useMutation } from 'react-query'
import { useIntl } from 'react-intl'
import { CreateGoalDto } from 'dto'
import schema from 'schemas/goal'
import GoalService from 'services/GoalService'
import useSnackbar from 'hooks/useSnackbar'
import { useMutateGoals } from 'pages/[id]/hook'
import { getToday } from 'helpers/date'
import { scrollToElem } from 'helpers/dom'
import { getNextState } from './helper'

export default function useForm(onSuccess: () => void): FormikProps<CreateGoalDto> {
  const { mutateAsync } = useSendCreateGoal(onSuccess)

  return useFormik<CreateGoalDto>({
    initialValues: {
      started: getToday().toISOString(),
      name: '',
      hashtags: '',
      stages: [],
      tasks: [{ name: '', date: undefined }],
    },
    validationSchema: schema,
    async onSubmit(data) {
      await mutateAsync(data)
    },
  })
}

const useSendCreateGoal = (onSuccess: () => void) => {
  const { formatMessage } = useIntl()
  const [enqueueSnackbar] = useSnackbar()
  const [goals, mutateGoal] = useMutateGoals()

  return useMutation(GoalService.create, {
    onSuccess(goal) {
      const message = formatMessage({ id: 'page.user.modal-goal.message' })

      mutateGoal(getNextState(goals, goal))
      onSuccess()
      enqueueSnackbar({ message, severity: 'success', icon: 'goal' })
      setTimeout(() => scrollToElem(`goal-${goal.id}`), 500)
    },
  })
}
