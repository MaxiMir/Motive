import { FormikProps, useFormik } from 'formik'
import { useMutation } from 'react-query'
import { CreateDayDto, GoalDto } from 'src/common/dto'
import validationSchema from 'src/common/schemas/tasks'
import { GoalService } from 'src/common/services/goal'
import { getTomorrow } from 'src/common/helpers/date'
import useSnackbar from 'src/common/hooks/useSnackbar'
import { useChangeDayUrl, useMutateGoals } from '@modules/user'
import { useIntl } from 'react-intl'
import { getNextState } from './helper'

export default function useForm(goal: GoalDto, onSuccess: () => void): FormikProps<CreateDayDto> {
  const { id } = goal
  const { mutateAsync } = useSendAddDay()

  return useFormik<CreateDayDto>({
    initialValues: {
      id,
      date: getTomorrow().toISOString(),
      tasks: [{ name: '', date: undefined }],
    },
    validationSchema,
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
