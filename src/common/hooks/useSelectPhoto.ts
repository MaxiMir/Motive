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
      const messageTmpl = formatMessage({ id: 'hook.use-select-photo' })
      const message = messageTmpl.replace('$0', PHOTO_LIMIT.toString())

      enqueueSnackbar({ message, severity: 'error' })
    }

    formik.setFieldValue('photos', photos.slice(0, PHOTO_LIMIT))
  }
}