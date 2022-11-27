import { FormikProps, useFormik } from 'formik'
import { useMutation } from 'react-query'
import { v4 as uuidV4 } from 'uuid'
import { CreateDayDto, GoalDto } from '@dto'
import { tasksSchema } from '@schemas/tasks'
import { GoalService } from '@services/goal'
import { getTomorrow } from '@utils/date'
import useSnackbar from '@hooks/useSnackbar'
import { useChangeDayUrl, useMutateGoals } from '@modules/user/hook'
import { useIntl } from 'react-intl'
import { getNextState } from './helper'

export default function useForm(goal: GoalDto, onSuccess: () => void): FormikProps<CreateDayDto> {
  const { id } = goal
  const { mutateAsync } = useSendAddDay()

  return useFormik<CreateDayDto>({
    initialValues: {
      id,
      date: getTomorrow().toISOString(),
      tasks: [{ id: uuidV4(), name: '', date: undefined }],
    },
    validationSchema: tasksSchema,
    async onSubmit(data) {
      await mutateAsync(data)
      onSuccess()
    },
  })
}

const useSendAddDay = () => {
  const { formatMessage } = useIntl()
  const [enqueueSnackbar] = useSnackbar()
  const [goals, mutateGoals] = useMutateGoals()
  const changeDayUrl = useChangeDayUrl()

  return useMutation(GoalService.createDay, {
    onSuccess({ days }, { id }) {
      const day = days[days.length - 1]
      const message = formatMessage({ id: 'common.next-day-loading' })

      mutateGoals(getNextState(goals, day, id))
      changeDayUrl(goals, id, day.id)
      enqueueSnackbar({ message, severity: 'success', icon: 'speaker' })
    },
  })
}
