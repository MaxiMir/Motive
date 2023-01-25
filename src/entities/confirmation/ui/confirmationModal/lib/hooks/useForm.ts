import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { formatISO } from 'date-fns'
import { useFormik } from 'formik'
import { getMidnight } from '@shared/lib/utils/date'
import { scrollToElem } from '@shared/lib/helpers/document'
import { useSnackbar } from '@entities/snackbar'
import { useUserPage } from '@entities/pages'
import { createConfirmation } from '@entities/confirmation/api/createConfirmation'
import { confirmationSchema } from '@entities/confirmation/config/schema'

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
  const { mutateAsync } = useMutation(createConfirmation, {
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
