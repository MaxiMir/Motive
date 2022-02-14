import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { GoalDto } from 'dto'
import { UseFormType } from 'types'
import FeedbackService from 'services/FeedbackService'
import useSnackbar from 'hooks/useSnackbar'
import { useMutateGoals } from 'views/UserView/hook'
import schema from 'schemas/feedback'
import { getGoalNextState } from './helper'

interface Values {
  text: string
  photos: File[]
  video: ''
}

export default function useForm(goal: GoalDto, onClose: () => void): UseFormType<Values> {
  const { id } = goal
  const { isLoading, mutate } = useSendFeedback(id, onClose)
  const formik = useFormik<Values>({
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
      mutate(formData)
    },
  })

  return { isLoading, formik }
}

const useSendFeedback = (goalId: number, onClose: () => void) => {
  const { enqueueSnackbar } = useSnackbar()
  const [goals, mutate] = useMutateGoals()

  return useMutation(FeedbackService.create, {
    onSuccess: (feedback) => {
      mutate(getGoalNextState(goals, goalId, feedback))
      onClose()
      enqueueSnackbar({ message: 'Feedback successfully added', severity: 'success', icon: 'feedback' })
    },
  })
}
