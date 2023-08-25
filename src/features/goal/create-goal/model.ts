import { formatISO, startOfDay } from 'date-fns'
import { useFormik } from 'formik'
import { produce } from 'immer'
import { flushSync } from 'react-dom'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useGoalsCache } from 'entities/user'
import { CreateGoalDto, GoalDto, createGoal } from 'shared/api'
import { FRONTEND_ID } from 'shared/config'
import { scrollToElem } from 'shared/lib/helpers'
import { useSnackbar } from 'shared/ui/snackbar'
import { GoalSchema } from './schema'

export function useCreateGoalForm(onSuccess: () => void) {
  const { formatMessage } = useIntl()
  const { enqueueSnackbar } = useSnackbar()
  const [goals, mutateGoals] = useGoalsCache()
  const { mutateAsync } = useMutation(createGoal, {
    onSuccess(dto) {
      const message = formatMessage({ id: 'page.user.modal-goal.message-created' })

      flushSync(() => {
        mutateGoals(getNextState(goals, dto))
        onSuccess()
        enqueueSnackbar(message, { severity: 'success', icon: '💎' })
      })
      setTimeout(() => scrollToElem(`goal-${dto.id}`), 250)
    },
  })

  return useFormik<CreateGoalDto>({
    initialValues: {
      started: formatISO(startOfDay(new Date())),
      name: '',
      hashtags: '',
      sphere: undefined as never,
      stages: [],
      tasks: [
        {
          [FRONTEND_ID]: crypto.randomUUID(),
          name: '',
          date: null,
          description: null,
          priority: null,
        },
      ],
    },
    validationSchema: GoalSchema,
    onSubmit(data) {
      return mutateAsync(data)
    },
  })
}

function getNextState(goals: GoalDto[], goal: GoalDto) {
  return produce(goals, (draft) => {
    draft.push(goal)
  })
}
