import produce from 'immer'
import { useFormik } from 'formik'
import { DayCreationDto, GoalDto } from 'dto'
import { UseFormType } from 'types'
import GoalService from 'services/GoalService'
import useSend from 'hooks/useSend'
import useChangeDayUrl from 'hooks/useChangeDayUrl'
import { useMutateGoals } from 'views/UserView/hook'
import schema from 'schemas/tasks'

export default function useForm(goal: GoalDto, onClose: () => void): UseFormType<DayCreationDto> {
  const { isLoading, send } = useSendAddDay(goal, onClose)
  const formik = useFormik<DayCreationDto>({
    initialValues: {
      id: goal.id,
      tasks: [{ name: '', date: undefined }],
    },
    validationSchema: schema,
    async onSubmit(data) {
      send(data)
    },
  })

  return { isLoading, formik }
}

const useSendAddDay = (goal: GoalDto, onClose: () => void) => {
  const [goals, mutate] = useMutateGoals()
  const changeDayUrl = useChangeDayUrl()

  return useSend(GoalService.addDay, {
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
