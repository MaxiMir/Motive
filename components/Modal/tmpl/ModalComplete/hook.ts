import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { GoalDto } from 'dto'
import { UseFormType } from 'types'
import GoalService from 'services/GoalService'
import { useUserPage } from 'views/UserView/hook'
import schema from 'schemas/complete'

interface Values {
  description: string
  photos: File[]
  video: ''
}

export default function useForm(goal: GoalDto, onSuccess: () => void): UseFormType<Values> {
  const { isLoading, mutate } = useSendComplete(onSuccess)
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

const useSendComplete = (onSuccess: () => void) => {
  const { refetch } = useUserPage()

  return useMutation(GoalService.setCompleted, {
    async onSuccess() {
      await refetch()
      onSuccess()
    },
  })
}
