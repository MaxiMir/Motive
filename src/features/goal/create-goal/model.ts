import { useFormik } from 'formik'
import { produce } from 'immer'
import { flushSync } from 'react-dom'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useGoalsCache } from 'entities/user'
import { CreatedGoal, CreateGoalDto, GoalDto, createGoal } from 'shared/api'
import { scrollToElem } from 'shared/lib/helpers'
import { getMidnightISO } from 'shared/lib/utils'
import { useSnackbar } from 'shared/ui/snackbar'
import { GoalSchema } from './schema'

const getNextState = (goals: GoalDto[], goal: CreatedGoal) =>
  produce(goals, (draft) => {
    draft.push({ ...goal, day: goal.days[0] })
  })

export const useCreateGoalForm = (onSuccess: () => void) => {
  const { formatMessage } = useIntl()
  const { enqueueSnackbar } = useSnackbar()
  const [goals, mutateGoal] = useGoalsCache()
  const { mutateAsync } = useMutation(createGoal, {
    onSuccess(goal) {
      const message = formatMessage({ id: 'page.user.modal-goal.message' })

      flushSync(() => {
        mutateGoal(getNextState(goals, goal))
        onSuccess()
        enqueueSnackbar(message, { severity: 'success', icon: '💎' })
      })

      setTimeout(() => scrollToElem(`goal-${goal.id}`), 250)
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
    validationSchema: GoalSchema,
    async onSubmit(data) {
      await mutateAsync(data)
    },
  })
}
