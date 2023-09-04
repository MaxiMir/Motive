import { useFormik } from 'formik'
import { produce } from 'immer'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useChangeDayUrl, useGoalsCache } from 'entities/user'
import { CreateDayDto, createDay } from 'shared/api'
import { FRONTEND_ID } from 'shared/config'
import { useSnackbar } from 'shared/ui/snackbar'
import { DaySchema } from './schema'

export function useCreateDayForm(goalId: number, date: string, onSuccess: () => void) {
  const { formatMessage } = useIntl()
  const { enqueueSnackbar } = useSnackbar()
  const [goals, mutateGoals] = useGoalsCache()
  const changeDayUrl = useChangeDayUrl()
  const { mutateAsync } = useMutation((dto: CreateDayDto) => createDay(goalId, dto), {
    onSuccess({ day }) {
      const message = formatMessage({ id: 'common.next-day-loading' })
      const nextState = produce(goals, (draft) => {
        const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]
        draftGoal.calendar.push({ id: day.id, date: day.date })
        draftGoal.day = day
      })
      mutateGoals(nextState)
      changeDayUrl(goals, goalId, day.id)
      enqueueSnackbar(message, { severity: 'success', icon: '🧞‍♂️️‍' })
      onSuccess()
    },
  })

  return useFormik<CreateDayDto>({
    initialValues: {
      date,
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
