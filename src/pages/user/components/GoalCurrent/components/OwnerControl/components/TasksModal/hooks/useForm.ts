import produce from 'immer'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useFormik } from 'formik'
import { CreateDayDto, DayDto } from '@shared/api/day'
import { useChangeDayUrl, useMutateGoals } from '@pages/user/hooks'
import { useGoalContext } from '@pages/user/components/GoalCurrent/hooks/useGoalContext'
import { tasksSchema } from '@entities/task'
import { useSnackbar } from '@entities/snackbar'
import { createDay } from '@entities/goal'
import { GoalDto } from '@shared/api/goal'
import { getTomorrowISO } from '@shared/lib/utils/date'

const getNextState = (goals: GoalDto[], id: number, day: DayDto) =>
  produce(goals, (draft) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === id)]
    draftGoal.calendar.push({ id: day.id, date: day.date })
    draftGoal.day = day
  })

export const useForm = (onSuccess: () => void) => {
  const { formatMessage } = useIntl()
  const { id } = useGoalContext()
  const { enqueueSnackbar } = useSnackbar()
  const [goals, mutateGoals] = useMutateGoals()
  const changeDayUrl = useChangeDayUrl()
  const { mutateAsync } = useMutation(createDay, {
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
      tasks: [{ id: crypto.randomUUID(), name: '', date: undefined }],
    },
    validationSchema: tasksSchema,
    async onSubmit(data) {
      await mutateAsync(data)
    },
  })
}
