import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { GoalDto } from 'dto'
import { UseFormType } from 'types'
import GoalService from 'services/GoalService'
import schema from 'schemas/complete'

interface Values {
  description: string
  photos: File[]
  video: ''
}

export default function useForm(goal: GoalDto, onClose: () => void): UseFormType<Values> {
  const { isLoading, mutate } = useSendComplete(onClose)
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
      mutate({ id: goal.day.id, body: formData })
    },
  })

  return { isLoading, formik }
}

const useSendComplete = (onClose: () => void) => {
  return useMutation(GoalService.setCompleted, {
    onSuccess() {
      onClose()
    },
  })
}
