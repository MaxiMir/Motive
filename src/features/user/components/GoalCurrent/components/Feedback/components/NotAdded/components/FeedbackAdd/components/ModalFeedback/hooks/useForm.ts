import { useFormik } from 'formik'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import feedbackSchema from '@schemas/feedback'
import { GoalDto } from '@dto'
import FeedbackService from '@services/feedback'
import useMutateGoals from '@features/user/hooks/useMutateGoals'
import useSnackbar from '@hooks/useSnackbar'
import { getNextState } from '../helper'

interface Values {
  text: string
  photos: File[]
  video: ''
}

const useForm = (goal: GoalDto, onSuccess: () => void) => {
  const { formatMessage } = useIntl()
  const [enqueueSnackbar] = useSnackbar()
  const [goals, mutateGoals] = useMutateGoals()
  const { mutate } = useMutation(FeedbackService.create, {
    onSuccess: (feedback) => {
      const message = formatMessage({ id: 'page.user.modal-feedback.message' })
      mutateGoals(getNextState(goals, goal.id, feedback))
      enqueueSnackbar({ message, severity: 'success', icon: 'feedback' })
      onSuccess()
    },
  })

  return useFormik<Values>({
    initialValues: {
      text: '',
      photos: [],
      video: '',
    },
    validationSchema: feedbackSchema,
    onSubmit(data) {
      const formData = new FormData()
      formData.append('dayId', goal.day.id.toString())
      formData.append('text', data.text.trim())
      data.photos.forEach((photo) => formData.append('photos', photo))
      mutate(formData)
    },
  })
}

export default useForm
