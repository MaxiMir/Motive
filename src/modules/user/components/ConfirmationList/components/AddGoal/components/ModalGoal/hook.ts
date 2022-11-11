import { FormikProps, useFormik } from 'formik'
import { useMutation } from 'react-query'
import { useIntl } from 'react-intl'
import { CreateGoalDto } from '@dto'
import { GoalService } from '@services/goal'
import { goalSchema } from '@schemas/goal'
import useSnackbar from '@hooks/useSnackbar'
import { getToday } from '@utils/date'
import { scrollToElem } from '@helpers/dom'
import { useMutateGoals } from '@modules/user/hook'
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
    validationSchema: goalSchema,
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
