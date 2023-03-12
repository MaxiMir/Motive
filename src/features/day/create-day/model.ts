import { useFormik } from 'formik'
import produce from 'immer'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useChangeDayUrl, useGoalsCache } from 'entities/user'
import { GoalDto, CreateDayDto, DayDto, createDay } from 'shared/api'
import { getTomorrowISO } from 'shared/lib/utils'
import { useSnackbar } from 'shared/ui/snackbar'
import { DaySchema } from './schema'

const getNextState = (goals: GoalDto[], id: number, day: DayDto) =>
  produce(goals, (draft) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === id)]
    draftGoal.calendar.push({ id: day.id, date: day.date })
    draftGoal.day = day
  })

export const useCreateDay = (goalId: number, onSuccess: () => void) => {
  const { formatMessage } = useIntl()
  const { enqueueSnackbar } = useSnackbar()
  const [goals, mutateGoals] = useGoalsCache()
  const changeDayUrl = useChangeDayUrl()
  const { mutateAsync } = useMutation(createDay, {
    onSuccess({ days }) {
      const day = days[days.length - 1]
      const message = formatMessage({ id: 'common.next-day-loading' })
      mutateGoals(getNextState(goals, goalId, day))
      changeDayUrl(goals, goalId, day.id)
      enqueueSnackbar(message, { severity: 'success', icon: '🧞‍♂️️‍' })
      onSuccess()
    },
  })

  return useFormik<CreateDayDto>({
    initialValues: {
      id: goalId,
      date: getTomorrowISO(),
      tasks: [{ id: crypto.randomUUID(), name: '', date: undefined }],
    },
    validationSchema: DaySchema,
    async onSubmit(data) {
      await mutateAsync(data)
    },
  })
}
