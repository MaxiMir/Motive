import { FormikProps, useFormik } from 'formik'
import { useMutation } from 'react-query'
import { GoalDto } from 'dto'
import ConfirmationService from 'services/ConfirmationService'
import useSnackbar from 'hooks/useSnackbar'
import { scrollToElem } from 'helpers/dom'
import { getToday } from 'helpers/date'
import { useUserPage } from 'views/UserView/hook'
import schema from 'schemas/completion'

interface Values {
  text: string
  photos: File[]
  video: ''
  goalId: number
  end: Date
}

export default function useForm(goal: GoalDto, onSuccess: () => void): FormikProps<Values> {
  const { mutateAsync } = useSendConfirmation(onSuccess)

  return useFormik<Values>({
    initialValues: {
      text: '',
      photos: [],
      video: '',
      goalId: goal.id,
      end: getToday(),
    },
    validationSchema: schema,
    async onSubmit(data) {
      const formData = new FormData()
      formData.append('text', data.text.trim())
      formData.append('end', data.end.toISOString())
      formData.append('goalId', data.goalId.toString())
      data.photos.forEach((photo) => formData.append('photos', photo))
      await mutateAsync(formData)
    },
  })
}

const useSendConfirmation = (onSuccess: () => void) => {
  const { refetch } = useUserPage()
  const [enqueueSnackbar] = useSnackbar()

  return useMutation(ConfirmationService.create, {
    onSuccess() {
      onSuccess()
      setTimeout(() => scrollToElem('main'), 0)
      setTimeout(refetch, 300)
      enqueueSnackbar({ message: 'Your characteristics have been increased', severity: 'success', icon: 'bug' })
    },
  })
}
