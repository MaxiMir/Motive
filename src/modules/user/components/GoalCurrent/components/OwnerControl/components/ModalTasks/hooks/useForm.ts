import produce from 'immer'
import { v4 as uuidV4 } from 'uuid'
import { useIntl } from 'react-intl'
import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { getTomorrowISO } from '@lib/date'
import { useChangeDayUrl, useMutateGoals } from '@modules/user/hooks'
import { useGoalContext } from '@modules/user/components/GoalCurrent/hooks'
import { tasksSchema } from '@features/task'
import { GoalDto, GoalService } from '@features/goal'
import { CreateDayDto, DayDto } from '@features/day'
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
  const { mutateAsync } = useMutation(GoalService.createDay, {
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
      date: getTomorrowISO(),
      tasks: [{ id: uuidV4(), name: '', date: undefined }],
    },
    validationSchema: tasksSchema,
    async onSubmit(data) {
      await mutateAsync(data)
    },
  })
}
