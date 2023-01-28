import { useFormik } from 'formik'
import produce from 'immer'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useGoalContext } from 'entities/goal'
import { useSnackbar } from 'entities/snackbar'
import { useMutateGoals } from 'entities/user'
import { GoalDto, FeedbackDto, createFeedback, feedbackSchema } from 'shared/api'

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
