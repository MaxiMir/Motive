import { useFormik } from 'formik'
import produce from 'immer'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useGoalContext } from 'entities/goal'
import { useChangeDayUrl, useMutateGoals } from 'entities/user'
import { GoalDto, CreateDayDto, DayDto, createDay, tasksSchema } from 'shared/api'
import { getTomorrowISO } from 'shared/lib/utils'
import { useSnackbar } from 'shared/ui/snackbar'

const getNextState = (goals: GoalDto[], id: number, day: DayDto) =>
  produce(goals, (draft) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === id)]
    draftGoal.calendar.push({ id: day.id, date: day.date })
    draftGoal.day = day
  })

export const useForm = (onSuccess: () => void) => {
  const { id } = useGoalContext()
  const { formatMessage } = useIntl()
  const { enqueueSnackbar } = useSnackbar()
  const [goals, mutateGoals] = useMutateGoals()
  const changeDayUrl = useChangeDayUrl()
  const { mutateAsync } = useMutation(createDay, {
    onSuccess({ days }) {
      const day = days[days.length - 1]
      const message = formatMessage({ id: 'common.next-day-loading' })
      mutateGoals(getNextState(goals, id, day))
      changeDayUrl(goals, id, day.id)
      enqueueSnackbar({ message, severity: 'success', icon: '🧞‍♂️️‍' })
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
