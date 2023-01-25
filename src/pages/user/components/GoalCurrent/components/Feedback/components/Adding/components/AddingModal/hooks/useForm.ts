import produce from 'immer'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useFormik } from 'formik'
import { useMutateGoals } from '@pages/user/hooks'
import { useGoalContext } from '@pages/user/components/GoalCurrent/hooks/useGoalContext'
import { useSnackbar } from '@entities/snackbar'
import { createFeedback, feedbackSchema } from '@entities/feedback'
import { FeedbackDto } from '@shared/api/feedback'
import { GoalDto } from '@shared/api/goal'

const getNextState = (goals: GoalDto[], goalId: number, feedback: FeedbackDto) =>
  produce(goals, (draft) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]
    draftGoal.day.feedback = feedback
  })

interface Values {
  text: string
  photos: File[]
  video: ''
}

export const useForm = (onSuccess: () => void) => {
  const { id, day } = useGoalContext()
  const { formatMessage } = useIntl()
  const { enqueueSnackbar } = useSnackbar()
  const [goals, mutateGoals] = useMutateGoals()
  const { mutateAsync } = useMutation(createFeedback, {
    onSuccess: (feedback) => {
      const message = formatMessage({ id: 'page.user.modal-feedback.message' })
      mutateGoals(getNextState(goals, id, feedback))
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
    async onSubmit(data) {
      const formData = new FormData()
      formData.append('dayId', day.id.toString())
      formData.append('text', data.text.trim())
      data.photos.forEach((photo) => formData.append('photos', photo))
      await mutateAsync(formData).catch(() => false)
    },
  })
}
