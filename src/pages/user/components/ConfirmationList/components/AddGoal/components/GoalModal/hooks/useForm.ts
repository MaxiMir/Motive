import produce from 'immer'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useFormik } from 'formik'
import { array, object, string } from 'yup'
import { getMidnightISO } from '@lib/utils/date'
import { scrollToElem } from '@lib/helpers/document'
import { useMutateGoals } from '@pages/user/hooks'
import { useSnackbar } from '@entities/snackbar'
import { CreatedGoal, CreateGoalDto, GoalDto, GoalService } from '@entities/goal'
import { tasksListSchema } from '@entities/task'

const getNextState = (goals: GoalDto[], goal: CreatedGoal) =>
  produce(goals, (draft) => {
    draft.push({ ...goal, day: goal.days[0] })
  })

export const useForm = (onSuccess: () => void) => {
  const { formatMessage } = useIntl()
  const { enqueueSnackbar } = useSnackbar()
  const [goals, mutateGoal] = useMutateGoals()
  const { mutateAsync } = useMutation(GoalService.create, {
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
    validationSchema: object({
      name: string()
        .trim()
        .required('The name is needed')
        .min(5, "It's too short.")
        .max(32, "It's so long."),
      hashtags: string().trim().max(255, "It's so long."),
      stages: array().of(
        object({
          name: string()
            .trim()
            .required('The stage name is needed')
            .min(5, "It's too short.")
            .max(32, "It's so long."),
        }),
      ),
      tasks: tasksListSchema,
    }),
    async onSubmit(data) {
      await mutateAsync(data)
    },
  })
}
