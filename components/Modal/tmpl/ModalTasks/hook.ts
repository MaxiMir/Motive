import produce from 'immer'
import { useFormik } from 'formik'
import { DayCreationDto, GoalDto } from 'dto'
import { UseFormType } from 'types'
import GoalService from 'services/GoalService'
import useSend from 'hooks/useSend'
import useChangeDayUrl from 'hooks/useChangeDayUrl'
import { useMutatePage } from 'views/UserView/hook'
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
  const [page, mutate] = useMutatePage()
  const changeDayUrl = useChangeDayUrl()

  return useSend(GoalService.addDay, {
    onSuccess(response) {
      const day = response.days[response.days.length - 1]

      mutate(
        produce(page, (draft) => {
          const draftGoals = draft.content.goals
          const draftGoal = draftGoals[draftGoals.findIndex((g) => g.id === goal.id)]

          draftGoal.calendar.push({ id: day.id, date: day.date })
          draftGoal.days = [day]
        }),
        false,
      )
      changeDayUrl(page.content.goals, goal.id, response.days[0].id)
      onClose()
    },
  })
}
