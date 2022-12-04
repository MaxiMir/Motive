import produce from 'immer'
import { v4 as uuidV4 } from 'uuid'
import { useMutation } from 'react-query'
import { useFormik } from 'formik'
import { CreatedGoal, CreateGoalDto, GoalDto } from '@dto'
import goalSchema from '@schemas/goal'
import { getMidnight } from '@utils/date'
import { useIntl } from 'react-intl'
import GoalService from '@services/goal'
import useSnackbar from '@hooks/useSnackbar'
import { scrollToElem } from '@helpers/window'
import useMutateGoals from '@user-hooks/useMutateGoals'

const getNextState = (goals: GoalDto[], goal: CreatedGoal) =>
  produce(goals, (draft) => {
    draft.push({ ...goal, day: goal.days[0] })
  })

const useForm = (onSuccess: () => void) => {
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

export default useForm
