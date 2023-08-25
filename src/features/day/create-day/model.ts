import { addDays, formatISO, startOfDay } from 'date-fns'
import { useFormik } from 'formik'
import { produce } from 'immer'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useChangeDayUrl, useGoalsCache } from 'entities/user'
import { GoalDto, CreateDayDto, DayDto, createDay } from 'shared/api'
import { FRONTEND_ID } from 'shared/config'
import { useSnackbar } from 'shared/ui/snackbar'
import { DaySchema } from './schema'

export function useCreateDayForm(goalId: number, lastDate: string, onSuccess: () => void) {
  const { formatMessage } = useIntl()
  const { enqueueSnackbar } = useSnackbar()
  const [goals, mutateGoals] = useGoalsCache()
  const changeDayUrl = useChangeDayUrl()
  const { mutateAsync } = useMutation((dto: CreateDayDto) => createDay(goalId, dto), {
    onSuccess({ day }) {
      const message = formatMessage({ id: 'common.next-day-loading' })
      mutateGoals(getNextState(goals, goalId, day))
      changeDayUrl(goals, goalId, day.id)
      enqueueSnackbar(message, { severity: 'success', icon: '🧞‍♂️️‍' })
      onSuccess()
    },
  })

  return useFormik<CreateDayDto>({
    initialValues: {
      date: formatISO(startOfDay(addDays(new Date(lastDate), 1))),
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
    validationSchema: DaySchema,
    onSubmit(data) {
      return mutateAsync(data)
    },
  })
}

function getNextState(goals: GoalDto[], id: number, day: DayDto) {
  return produce(goals, (draft) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === id)]
    draftGoal.calendar.push({ id: day.id, date: day.date })
    draftGoal.day = day
  })
}
