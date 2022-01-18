import { useFormik } from 'formik'
import { GoalDto } from 'dto'
import GoalService from 'services/GoalService'
import { UseFormType } from 'hooks/useFormType'
import useSend from 'hooks/useSend'

interface Values {
  text: string
  photos: File[]
  video: ''
}

export default function useForm(goal: GoalDto, onClose: () => void): UseFormType<Values> {
  const { isLoading, send } = useSendComplete(onClose)
  const formik = useFormik<Values>({
    initialValues: {
      text: '',
      photos: [],
      video: '',
    },
    // validationSchema: schema,
    async onSubmit(data) {
      const formData = new FormData()

      formData.append('text', data.text.trim())
      data.photos.forEach((photo) => formData.append('photos', photo))

      send({ id: goal.days[0].id, body: formData })
    },
  })

  return { isLoading, formik }
}

const useSendComplete = (onClose: () => void) => {
  return useSend(GoalService.setCompleted, {
    onSuccess() {
      onClose()
    },
  })
}
