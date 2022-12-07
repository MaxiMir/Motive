import produce from 'immer'
import { v4 as uuidV4 } from 'uuid'
import { useIntl } from 'react-intl'
import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { CreateDayDto, DayDto, GoalDto } from '@dto'
import { tasksSchema } from '@features/user/schemas'
import { getTomorrow } from '@lib/date'
import { useChangeDayUrl, useMutateGoals } from '@features/user/hooks'
import { useGoalContext } from '@features/user/components/GoalCurrent/hooks'
import GoalService from '@services/goal'
import useSnackbar from '@hooks/useSnackbar'

const getNextState = (goals: GoalDto[], id: number, day: DayDto) =>
  produce(goals, (draft) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === id)]
    draftGoal.calendar.push({ id: day.id, date: day.date })
    draftGoal.day = day
  })

export const useForm = (onSuccess: () => void) => {
  const { formatMessage } = useIntl()
  const { id } = useGoalContext()
  const [enqueueSnackbar] = useSnackbar()
  const [goals, mutateGoals] = useMutateGoals()
  const changeDayUrl = useChangeDayUrl()
  const { mutate } = useMutation(GoalService.createDay, {
    onSuccess({ days }) {
      const day = days[days.length - 1]
      const message = formatMessage({ id: 'common.next-day-loading' })
      mutateGoals(getNextState(goals, id, day))
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
