import produce from 'immer'
import { useFormik } from 'formik'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { FeedbackDto, GoalDto } from '@dto'
import { feedbackSchema } from '@modules/user/schemas'
import { useMutateGoals } from '@modules/user/hooks'
import { useGoalContext } from '@modules/user/components/GoalCurrent/hooks'
import FeedbackService from '@services/feedback'
import useSnackbar from '@hooks/useSnackbar'

const getNextState = (goals: GoalDto[], goalId: number, feedback: FeedbackDto): GoalDto[] =>
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
  const [enqueueSnackbar] = useSnackbar()
  const [goals, mutateGoals] = useMutateGoals()
  const { mutate } = useMutation(FeedbackService.create, {
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
    onSubmit(data) {
      const formData = new FormData()
      formData.append('dayId', day.id.toString())
      formData.append('text', data.text.trim())
      data.photos.forEach((photo) => formData.append('photos', photo))
      mutate(formData)
    },
  })
}
