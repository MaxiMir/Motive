import { formatISO } from 'date-fns'
import { useFormik } from 'formik'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useUserPage } from 'entities/page'
import { useSnackbar } from 'entities/snackbar'
import { createConfirmation, confirmationSchema } from 'shared/api'
import { scrollToElem } from 'shared/lib/helpers'
import { getMidnight } from 'shared/lib/utils'

interface Values {
  text: string
  photos: File[]
  video: ''
  goalId: number
  end: Date
}

export const useForm = (id: number, onSuccess: () => void) => {
  const { refetch } = useUserPage()
  const { formatMessage } = useIntl()
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
