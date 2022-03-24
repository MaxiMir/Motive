import { FormikProps, useFormik } from 'formik'
import { useMutation } from 'react-query'
import { CreateDayDto, GoalDto } from 'dto'
import schema from 'schemas/tasks'
import GoalService from 'services/GoalService'
import { getTomorrow } from 'helpers/date'
import { toShortUserName } from 'helpers/prepare'
import useClient from 'hooks/useClient'
import useSnackbar from 'hooks/useSnackbar'
import { useChangeDayUrl, useMutateGoals } from 'views/UserView/hook'
import { getNextState } from './helper'

export default function useForm(goal: GoalDto, onSuccess: () => void): FormikProps<CreateDayDto> {
  const { id } = goal
  const { mutateAsync } = useSendAddDay()

  return useFormik<CreateDayDto>({
    initialValues: {
      id,
      date: getTomorrow(),
      tasks: [{ name: '', date: undefined }],
    },
    validationSchema: schema,
    async onSubmit(data) {
      await mutateAsync(data)
      onSuccess()
    },
  })
}

const useSendAddDay = () => {
  const client = useClient()
  const [enqueueSnackbar] = useSnackbar()
  const [goals, mutateGoals] = useMutateGoals()
  const changeDayUrl = useChangeDayUrl()

  return useMutation(GoalService.createDay, {
    onSuccess({ days }, { id }) {
      const day = days[days.length - 1]

      mutateGoals(getNextState(goals, day, id))
      changeDayUrl(goals, id, day.id)
      enqueueSnackbar({
        message: `${toShortUserName(client?.name)}, uploading your next tasks`,
        severity: 'success',
        icon: 'speaker',
      })
    },
  })
}
