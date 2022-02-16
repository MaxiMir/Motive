import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { CreateDayDto, GoalDto } from 'dto'
import { UseFormType } from 'types'
import GoalService from 'services/GoalService'
import useChangeDayUrl from 'hooks/useChangeDayUrl'
import { useMutateGoals } from 'views/UserView/hook'
import schema from 'schemas/tasks'
import { getGoalNextState } from './helper'

export default function useForm(goal: GoalDto, onSuccess: () => void): UseFormType<CreateDayDto> {
  const { id } = goal
  const { isLoading, mutate } = useSendNewDay(id, onSuccess)
  const formik = useFormik<CreateDayDto>({
    initialValues: {
      id,
      tasks: [{ name: '', date: undefined }],
    },
    validationSchema: schema,
    async onSubmit(data) {
      mutate(data)
    },
  })

  return { isLoading, formik }
}

const useSendNewDay = (goalId: number, onSuccess: () => void) => {
  const [goals, mutate] = useMutateGoals()
  const changeDayUrl = useChangeDayUrl()

  return useMutation(GoalService.addDay, {
    onSuccess({ days }) {
      const day = days[days.length - 1]

      mutate(getGoalNextState(goals, goalId, day))
      changeDayUrl(goals, goalId, day.id)
      onSuccess()
    },
  })
}
