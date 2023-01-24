import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { formatISO } from 'date-fns'
import { useFormik } from 'formik'
import { getMidnight } from '@lib/date'
import { scrollToElem } from '@helpers/document'
import { useSnackbar } from '@entities/snackbar'
import { confirmationSchema } from '@entities/confirmation/schema'
import { ConfirmationService } from '@entities/confirmation/service'
import { useUserPage } from '@entities/pages'

interface Values {
  text: string
  photos: File[]
  video: ''
  goalId: number
  end: Date
}

export const useForm = (id: number, onSuccess: () => void) => {
  const { formatMessage } = useIntl()
  const { refetch } = useUserPage()
  const { enqueueSnackbar } = useSnackbar()
  const { mutateAsync } = useMutation(ConfirmationService.create, {
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
      goalId: id,
      end: getMidnight(),
    },
    validationSchema: confirmationSchema,
    async onSubmit(data) {
      const formData = new FormData()
      formData.append('text', data.text.trim())
      formData.append('end', formatISO(data.end))
      formData.append('goalId', data.goalId.toString())
      data.photos.forEach((photo) => formData.append('photos', photo))
      await mutateAsync(formData)
    },
  })
}
