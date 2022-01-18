import produce from 'immer'
import { useFormik } from 'formik'
import { GoalDto } from 'dto'
import DayService from 'services/DayService'
import useSend from 'hooks/useSend'
import useSnackbar from 'hooks/useSnackbar'
import { UseFormType } from 'hooks/useFormType'
import { useMutateGoals } from 'views/User/hook'
import schema from './schema'

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

      formData.append('text', data.text.trim())
      data.photos.forEach((photo) => formData.append('photos', photo))
      send({ id: goal.days[0].id, body: formData })
    },
  })

  return { isLoading, formik }
}

const useSendFeedback = (goal: GoalDto, onClose: () => void) => {
  const { enqueueSnackbar } = useSnackbar()
  const [goals, mutateGoals] = useMutateGoals()

  return useSend(DayService.createFeedback, {
    onSuccess: ({ feedback }) => {
      mutateGoals(
        produce(goals, (draft: GoalDto[]) => {
          const draftGoal = draft[draft.findIndex((g) => g.id === goal.id)]
          const [draftDay] = draftGoal.days

          draftDay.feedback = feedback
        }),
      )

      onClose()
      enqueueSnackbar({ message: 'Feedback successfully added', severity: 'success', icon: 'feedback' })
    },
  })
}
