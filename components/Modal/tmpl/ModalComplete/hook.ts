import { useFormik } from 'formik'
import { GoalDto } from 'dto'
import { UseFormType } from 'types'
import GoalService from 'services/GoalService'
import useSend from 'hooks/useSend'
import schema from 'schemas/complete'

interface Values {
  description: string
  photos: File[]
  video: ''
}

export default function useForm(goal: GoalDto, onClose: () => void): UseFormType<Values> {
  const { isLoading, send } = useSendComplete(onClose)
  const formik = useFormik<Values>({
    initialValues: {
      description: '',
      photos: [],
      video: '',
    },
    validationSchema: schema,
    async onSubmit(data) {
      const formData = new FormData()

      formData.append('description', data.description.trim())
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
