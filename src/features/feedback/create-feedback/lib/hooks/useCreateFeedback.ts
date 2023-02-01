import { useFormik } from 'formik'
import produce from 'immer'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useGoalsCache } from 'entities/user'
import { GoalDto, FeedbackDto, createFeedback, feedbackSchema } from 'shared/api'
import { useSnackbar } from 'shared/ui/snackbar'

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

export const useCreateFeedback = (goalId: number, dayId: number, onSuccess: () => void) => {
  const { formatMessage } = useIntl()
  const { enqueueSnackbar } = useSnackbar()
  const [goals, mutateGoals] = useGoalsCache()
  const { mutateAsync } = useMutation(createFeedback, {
    onSuccess: (feedback) => {
      const message = formatMessage({ id: 'page.user.modal-feedback.message' })
      mutateGoals(getNextState(goals, goalId, feedback))
      enqueueSnackbar({ message, severity: 'success', icon: '💭' })
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
      formData.append('dayId', dayId.toString())
      formData.append('text', data.text.trim())
      data.photos.forEach((photo) => formData.append('photos', photo))
      await mutateAsync(formData).catch(() => false)
    },
  })
}
