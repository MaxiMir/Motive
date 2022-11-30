import produce from 'immer'
import { v4 as uuidV4 } from 'uuid'
import { useIntl } from 'react-intl'
import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { CreateDayDto, DayDto, GoalDto } from '@dto'
import tasksSchema from '@schemas/tasks'
import { getTomorrow } from '@utils/date'
import GoalService from '@services/goal'
import useSnackbar from '@hooks/useSnackbar'
import useChangeDayUrl from '@user-hooks/useChangeDayUrl'
import useMutateGoals from '@user-hooks/useMutateGoals'

const getNextState = (goals: GoalDto[], day: DayDto, goalId: number) =>
  produce(goals, (draft) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]
    draftGoal.calendar.push({ id: day.id, date: day.date })
    draftGoal.day = day
  })

function useForm(goal: GoalDto, onSuccess: () => void) {
  const { id } = goal
  const { formatMessage } = useIntl()
  const [enqueueSnackbar] = useSnackbar()
  const [goals, mutateGoals] = useMutateGoals()
  const changeDayUrl = useChangeDayUrl()
  const { mutate } = useMutation(GoalService.createDay, {
    onSuccess({ days }) {
      const day = days[days.length - 1]
      const message = formatMessage({ id: 'common.next-day-loading' })
      mutateGoals(getNextState(goals, day, id))
      changeDayUrl(goals, id, day.id)
      enqueueSnackbar({ message, severity: 'success', icon: 'speaker' })
      onSuccess()
    },
  })

  return useFormik<CreateDayDto>({
    initialValues: {
      id,
      date: getTomorrow().toISOString(),
      tasks: [{ id: uuidV4(), name: '', date: undefined }],
    },
    validationSchema: tasksSchema,
    onSubmit(data) {
      mutate(data)
    },
  })
}

export default useForm
