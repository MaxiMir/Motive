import { FormikProps, useFormik } from 'formik'
import { useMutation } from 'react-query'
import { GoalDto } from 'dto'
import schema from 'schemas/feedback'
import FeedbackService from 'services/FeedbackService'
import useLocale from 'hooks/useLocale'
import useSnackbar from 'hooks/useSnackbar'
import { useMutateGoals } from 'pages/[id]/hook'
import { getNextState } from './helper'
import i18n from './i18n'

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
  const { locale } = useLocale()
  const [enqueueSnackbar] = useSnackbar()
  const [goals, mutateGoals] = useMutateGoals()
  const { message } = i18n[locale]

  return useMutation(FeedbackService.create, {
    onSuccess: (feedback) => {
      mutateGoals(getNextState(goals, goalId, feedback))
      enqueueSnackbar({ message, severity: 'success', icon: 'feedback' })
    },
  })
}
