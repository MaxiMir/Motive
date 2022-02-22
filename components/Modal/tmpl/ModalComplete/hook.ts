import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { GoalDto } from 'dto'
import { UseFormType } from 'types'
import GoalService from 'services/GoalService'
import useSnackbar from 'hooks/useSnackbar'
import { scrollToElem } from 'helpers/dom'
import { useUserPage } from 'views/UserView/hook'
import schema from 'schemas/complete'

interface Values {
  text: string
  photos: File[]
  video: ''
}

export default function useForm(goal: GoalDto, onSuccess: () => void): UseFormType<Values> {
  const { isLoading, mutate } = useSendConfirmation(onSuccess)
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
      mutate({ id: goal.id, body: formData })
    },
  })

  return { isLoading, formik }
}

const useSendConfirmation = (onSuccess: () => void) => {
  const { refetch } = useUserPage()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation(GoalService.updateConfirmation, {
    onSuccess() {
      onSuccess()
      setTimeout(() => scrollToElem('main'), 0)
      setTimeout(refetch, 300)
      enqueueSnackbar({ message: 'Your characteristics have been increased', severity: 'success', icon: 'bug' })
    },
  })
}
