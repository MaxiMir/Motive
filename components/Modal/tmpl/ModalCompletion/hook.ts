import { FormikProps, useFormik } from 'formik'
import { useMutation } from 'react-query'
import { GoalDto } from 'dto'
import GoalService from 'services/GoalService'
import useSnackbar from 'hooks/useSnackbar'
import { scrollToElem } from 'helpers/dom'
import { useUserPage } from 'views/UserView/hook'
import schema from 'schemas/completion'

interface Values {
  text: string
  photos: File[]
  video: ''
}

export default function useForm(goal: GoalDto, onSuccess: () => void): FormikProps<Values> {
  const { mutateAsync } = useSendConfirmation(onSuccess)

  return useFormik<Values>({
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
      await mutateAsync({ id: goal.id, body: formData })
    },
  })
}

const useSendConfirmation = (onSuccess: () => void) => {
  const { refetch } = useUserPage()
  const [enqueueSnackbar] = useSnackbar()

  return useMutation(GoalService.updateConfirmation, {
    onSuccess() {
      onSuccess()
      setTimeout(() => scrollToElem('main'), 0)
      setTimeout(refetch, 300)
      enqueueSnackbar({ message: 'Your characteristics have been increased', severity: 'success', icon: 'bug' })
    },
  })
}
