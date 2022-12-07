import produce from 'immer'
import { v4 as uuidV4 } from 'uuid'
import { useMutation } from 'react-query'
import { useFormik } from 'formik'
import { CreatedGoal, CreateGoalDto, GoalDto } from '@dto'
import { goalSchema } from '@features/user/schemas'
import { getMidnight } from '@lib/date'
import { useIntl } from 'react-intl'
import GoalService from '@services/goal'
import { useMutateGoals } from '@features/user/hooks'
import useSnackbar from '@hooks/useSnackbar'
import { scrollToElem } from '@helpers/document'

const getNextState = (goals: GoalDto[], goal: CreatedGoal) =>
  produce(goals, (draft) => {
    draft.push({ ...goal, day: goal.days[0] })
  })

export const useForm = (onSuccess: () => void) => {
  const { formatMessage } = useIntl()
  const [enqueueSnackbar] = useSnackbar()
  const [goals, mutateGoal] = useMutateGoals()
  const { mutate } = useMutation(GoalService.create, {
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
      started: getMidnight().toISOString(),
      name: '',
      hashtags: '',
      stages: [],
      tasks: [{ id: uuidV4(), name: '', date: undefined }],
    },
    validationSchema: goalSchema,
    onSubmit(data) {
      mutate(data)
    },
  })
}
