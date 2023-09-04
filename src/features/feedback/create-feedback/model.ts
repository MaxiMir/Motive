import { useFormik } from 'formik'
import { produce } from 'immer'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useGoalsCache } from 'entities/user'
import { createFeedback } from 'shared/api'
import { useSnackbar } from 'shared/ui/snackbar'
import { FeedbackSchema } from './schema'

interface Values {
  text: string
  photos: File[]
  video: ''
}

export function useCreateFeedbackForm(goalId: number, dayId: number, onSuccess: () => void) {
  const { formatMessage } = useIntl()
  const { enqueueSnackbar } = useSnackbar()
  const [goals, mutateGoals] = useGoalsCache()
  const { mutateAsync } = useMutation(createFeedback, {
    onSuccess: (res) => {
      const message = formatMessage({ id: 'page.user.modal-feedback.message' })
      const nextState = produce(goals, (draft) => {
        const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]
        draftGoal.day.feedback = res
      })
      mutateGoals(nextState)
      enqueueSnackbar(message, { severity: 'success', icon: '💭' })
      onSuccess()
    },
  })

  return useFormik<Values>({
    initialValues: {
      text: '',
      photos: [],
      video: '',
    },
    validationSchema: FeedbackSchema,
    onSubmit(data) {
      const formData = new FormData()
      formData.append('dayId', dayId.toString())
      formData.append('text', data.text.trim())
      data.photos.forEach((photo) => formData.append('photos', photo))
      return mutateAsync(formData).catch(() => false)
    },
  })
}
