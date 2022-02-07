import produce from 'immer'
import { useFormik } from 'formik'
import { GoalDto } from 'dto'
import { UseFormType } from 'types'
import FeedbackService from 'services/FeedbackService'
import useSend from 'hooks/useSend'
import useSnackbar from 'hooks/useSnackbar'
import { useMutateGoals } from 'views/UserView/hook'
import schema from 'schemas/feedback'

interface Values {
  text: string
  photos: File[]
  video: ''
}

export default function useForm(goal: GoalDto, onClose: () => void): UseFormType<Values> {
  const { isLoading, send } = useSendFeedback(goal, onClose)
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
      send(formData)
    },
  })

  return { isLoading, formik }
}

const useSendFeedback = (goal: GoalDto, onClose: () => void) => {
  const { enqueueSnackbar } = useSnackbar()
  const [goals, mutate] = useMutateGoals()

  return useSend(FeedbackService.create, {
    onSuccess: (feedback) => {
      mutate(
        produce(goals, (draft: GoalDto[]) => {
          const draftGoal = draft[draft.findIndex((g) => g.id === goal.id)]
          draftGoal.day.feedback = feedback
        }),
      )

      onClose()
      enqueueSnackbar({ message: 'Feedback successfully added', severity: 'success', icon: 'feedback' })
    },
  })
}
