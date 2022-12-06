import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useFormik } from 'formik'
import completionSchema from '@schemas/completion'
import { GoalDto } from '@dto'
import { getMidnight } from '@lib/date'
import ConfirmationService from '@services/confirmation'
import useUserPage from '@features/user/hooks/useUserPage'
import useSnackbar from '@hooks/useSnackbar'
import { scrollToElem } from '@helpers/document'

interface Values {
  text: string
  photos: File[]
  video: ''
  goalId: number
  end: Date
}

const useForm = (goal: GoalDto, onSuccess: () => void) => {
  const { formatMessage } = useIntl()
  const { refetch } = useUserPage()
  const [enqueueSnackbar] = useSnackbar()
  const { mutate } = useMutation(ConfirmationService.create, {
    onSuccess() {
      const message = formatMessage({ id: 'component.modal-completion.message' })
      onSuccess()
      setTimeout(() => scrollToElem('main'), 0)
      setTimeout(refetch, 300)
      enqueueSnackbar({ message, severity: 'success', icon: 'bug' })
    },
  })

  return useFormik<Values>({
    initialValues: {
      text: '',
      photos: [],
      video: '',
      goalId: goal.id,
      end: getMidnight(),
    },
    validationSchema: completionSchema,
    async onSubmit(data) {
      const formData = new FormData()
      formData.append('text', data.text.trim())
      formData.append('end', data.end.toISOString())
      formData.append('goalId', data.goalId.toString())
      data.photos.forEach((photo) => formData.append('photos', photo))
      mutate(formData)
    },
  })
}

export default useForm
