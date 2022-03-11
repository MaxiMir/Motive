import produce from 'immer'
import { FormikProps, useFormik } from 'formik'
import { useMutation } from 'react-query'
import { CreateDayDto, GoalDto } from 'dto'
import GoalService from 'services/GoalService'
import { getTomorrow } from 'helpers/date'
import useChangeDayUrl from 'hooks/useChangeDayUrl'
import { useMutateGoals } from 'views/UserView/hook'
import schema from 'schemas/tasks'

export default function useForm(goal: GoalDto, onSuccess: () => void): FormikProps<CreateDayDto> {
  const { id } = goal
  const { mutateAsync } = useSendNewDay(id, onSuccess)

  return useFormik<CreateDayDto>({
    initialValues: {
      id,
      date: getTomorrow(),
      tasks: [{ name: '', date: undefined }],
    },
    validationSchema: schema,
    async onSubmit(data) {
      await mutateAsync(data)
    },
  })
}

const useSendNewDay = (goalId: number, onSuccess: () => void) => {
  const [goals, mutateGoals] = useMutateGoals()
  const changeDayUrl = useChangeDayUrl()

  return useMutation(GoalService.addDay, {
    onSuccess({ days }) {
      const day = days[days.length - 1]

      mutateGoals(
        produce(goals, (draft: GoalDto[]) => {
          const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]
          draftGoal.calendar.push({ id: day.id, date: day.date })
          draftGoal.day = day
        }),
      )
      changeDayUrl(goals, goalId, day.id)
      onSuccess()
    },
  })
}
