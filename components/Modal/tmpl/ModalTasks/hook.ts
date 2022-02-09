import produce from 'immer'
import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { DayCreationDto, GoalDto } from 'dto'
import { UseFormType } from 'types'
import GoalService from 'services/GoalService'
import useChangeDayUrl from 'hooks/useChangeDayUrl'
import { useMutateGoals } from 'views/UserView/hook'
import schema from 'schemas/tasks'

export default function useForm(goal: GoalDto, onClose: () => void): UseFormType<DayCreationDto> {
  const { isLoading, mutate } = useSendAddDay(goal, onClose)
  const formik = useFormik<DayCreationDto>({
    initialValues: {
      id: goal.id,
      tasks: [{ name: '', date: undefined }],
    },
    validationSchema: schema,
    async onSubmit(data) {
      mutate(data)
    },
  })

  return { isLoading, formik }
}

const useSendAddDay = (goal: GoalDto, onClose: () => void) => {
  const [goals, mutate] = useMutateGoals()
  const changeDayUrl = useChangeDayUrl()

  return useMutation(GoalService.addDay, {
    onSuccess({ days }) {
      const day = days[days.length - 1]

      mutate(
        produce(goals, (draft: GoalDto[]) => {
          const draftGoal = draft[draft.findIndex((g) => g.id === goal.id)]
          draftGoal.calendar.push({ id: day.id, date: day.date })
          draftGoal.day = day
        }),
      )
      changeDayUrl(goals, goal.id, day.id)
      onClose()
    },
  })
}
