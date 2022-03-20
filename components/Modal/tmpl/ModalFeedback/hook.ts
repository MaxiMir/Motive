import { FormikProps, useFormik } from 'formik'
import { useMutation } from 'react-query'
import { GoalDto } from 'dto'
import schema from 'schemas/feedback'
import FeedbackService from 'services/FeedbackService'
import useSnackbar from 'hooks/useSnackbar'
import { useMutateGoals } from 'views/UserView/hook'
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
    validationSchema: schema,
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
  const [enqueueSnackbar] = useSnackbar()
  const [goals, mutateGoals] = useMutateGoals()

  return useMutation(FeedbackService.create, {
    onSuccess: (feedback) => {
      mutateGoals(getNextState(goals, goalId, feedback))
      enqueueSnackbar({ message: 'Feedback successfully added', severity: 'success', icon: 'feedback' })
    },
  })
}
