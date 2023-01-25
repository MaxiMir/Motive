import produce from 'immer'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useFormik } from 'formik'
import { getMidnightISO } from '@lib/utils/date'
import { scrollToElem } from '@lib/helpers/document'
import { useMutateGoals } from '@pages/user/hooks'
import { useSnackbar } from '@entities/snackbar'
import { CreatedGoal, CreateGoalDto, GoalDto, goalSchema, createGoal } from '@entities/goal'

const getNextState = (goals: GoalDto[], goal: CreatedGoal) =>
  produce(goals, (draft) => {
    draft.push({ ...goal, day: goal.days[0] })
  })

export const useForm = (onSuccess: () => void) => {
  const { formatMessage } = useIntl()
  const { enqueueSnackbar } = useSnackbar()
  const [goals, mutateGoal] = useMutateGoals()
  const { mutateAsync } = useMutation(createGoal, {
    onSuccess(goal) {
      const message = formatMessage({ id: 'page.user.modal-goal.message' })
      mutateGoal(getNextState(goals, goal))
      onSuccess()
      enqueueSnackbar({ message, severity: 'success', icon: 'goal' })
      setTimeout(() => scrollToElem(`goal-${goal.id}`), 500)
    },
  })

  return useFormik<CreateGoalDto>({
    initialValues: {
      started: getMidnightISO(),
      name: '',
      hashtags: '',
      stages: [],
      tasks: [{ id: crypto.randomUUID(), name: '', date: undefined }],
    },
    validationSchema: goalSchema,
    async onSubmit(data) {
      await mutateAsync(data)
    },
  })
}
