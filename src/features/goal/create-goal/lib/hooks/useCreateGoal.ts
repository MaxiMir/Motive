import { useFormik } from 'formik'
import produce from 'immer'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useMutateGoals } from 'entities/user'
import { CreatedGoal, CreateGoalDto, GoalDto, createGoal, goalSchema } from 'shared/api'
import { scrollToElem } from 'shared/lib/helpers'
import { getMidnightISO } from 'shared/lib/utils'
import { useSnackbar } from 'shared/ui/snackbar'

const getNextState = (goals: GoalDto[], goal: CreatedGoal) =>
  produce(goals, (draft) => {
    draft.push({ ...goal, day: goal.days[0] })
  })

export const useCreateGoal = (onSuccess: () => void) => {
  const { formatMessage } = useIntl()
  const { enqueueSnackbar } = useSnackbar()
  const [goals, mutateGoal] = useMutateGoals()
  const { mutateAsync } = useMutation(createGoal, {
    onSuccess(goal) {
      const message = formatMessage({ id: 'page.user.modal-goal.message' })
      mutateGoal(getNextState(goals, goal))
      onSuccess()
      enqueueSnackbar({ message, severity: 'success', icon: '💎' })
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
