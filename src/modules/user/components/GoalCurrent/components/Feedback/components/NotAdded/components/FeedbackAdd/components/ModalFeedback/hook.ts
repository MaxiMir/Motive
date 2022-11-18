import { FormikProps, useFormik } from 'formik'
import { useMutation } from 'react-query'
import { useIntl } from 'react-intl'
import { GoalDto } from '@dto'
import { feedbackSchema } from '@schemas/feedback'
import { FeedbackService } from '@services/feedback'
import { useMutateGoals } from '@modules/user/hook'
import useSnackbar from '@hooks/useSnackbar'
import { getNextState } from './helper'

interface Values {
  text: string
  photos: File[]
  video: ''
}

export default function useForm(goal: GoalDto, onSuccess: () => void): FormikProps<Values> {
  const { id } = goal
  const { mutateAsync } = useSendFeedback(id)

  return useFormik<Values>({
    initialValues: {
      text: '',
      photos: [],
      video: '',
    },
    validationSchema: feedbackSchema,
    async onSubmit(data) {
      const formData = new FormData()
      formData.append('dayId', goal.day.id.toString())
      formData.append('text', data.text.trim())
      data.photos.forEach((photo) => formData.append('photos', photo))
      await mutateAsync(formData)
      onSuccess()
    },
  })
}

const useSendFeedback = (goalId: number) => {
  const { formatMessage } = useIntl()
  const [enqueueSnackbar] = useSnackbar()
  const [goals, mutateGoals] = useMutateGoals()

  return useMutation(FeedbackService.create, {
    onSuccess: (feedback) => {
      const message = formatMessage({ id: 'page.user.modal-feedback.message' })
      mutateGoals(getNextState(goals, goalId, feedback))
      enqueueSnackbar({ message, severity: 'success', icon: 'feedback' })
    },
  })
}
