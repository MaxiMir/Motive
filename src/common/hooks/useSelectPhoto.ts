import { FormikProps } from 'formik'
import { useIntl } from 'react-intl'
import useSnackbar from '@hooks/useSnackbar'

const PHOTO_LIMIT = 10

export default function useSelectPhoto<T>(formik: FormikProps<T & { photos: File[] }>): (files: File[]) => void {
  const { formatMessage } = useIntl()
  const [enqueueSnackbar] = useSnackbar()

  return (files: File[]) => {
    const photos = [...formik.values.photos, ...files]

    if (photos.length > PHOTO_LIMIT) {
      const messageStart = formatMessage({ id: 'hook.use-select-photo-start' })
      const messageEnd = formatMessage({ id: 'hook.use-select-photo-end' })
      const message = [messageStart, PHOTO_LIMIT, messageEnd].join(' ')

      enqueueSnackbar({ message, severity: 'error' })
    }

    formik.setFieldValue('photos', photos.slice(0, PHOTO_LIMIT))
  }
}
