import { formatISO } from 'date-fns'
import { useFormik } from 'formik'
import { flushSync } from 'react-dom'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useUserPage } from 'entities/page'
import { createConfirmation } from 'shared/api'
import { scrollToElem } from 'shared/lib/helpers'
import { getMidnight } from 'shared/lib/utils'
import { useSnackbar } from 'shared/ui/snackbar'
import { ConfirmationSchema } from './schema'

interface Values {
  text: string
  photos: File[]
  video: ''
  goalId: number
  end: Date
}

export function useCreateConfirmationForm(goalId: number, onSuccess: () => void) {
  const { formatMessage } = useIntl()
  const { refetch } = useUserPage()
  const { enqueueSnackbar } = useSnackbar()
  const { mutateAsync } = useMutation(createConfirmation, {
    onSuccess() {
      const message = formatMessage({ id: 'component.modal-completion.message' })

      flushSync(() => {
        onSuccess()
        enqueueSnackbar(message, { severity: 'success', icon: '👾' })
        refetch()
      })
      scrollToElem('main')
    },
  })

  return useFormik<Values>({
    initialValues: {
      text: '',
      photos: [],
      video: '',
      goalId,
      end: getMidnight(),
    },
    validationSchema: ConfirmationSchema,
    onSubmit(data) {
      const formData = new FormData()
      formData.append('text', data.text.trim())
      formData.append('end', formatISO(data.end))
      formData.append('goalId', data.goalId.toString())
      data.photos.forEach((photo) => formData.append('photos', photo))
      return mutateAsync(formData)
    },
  })
}
