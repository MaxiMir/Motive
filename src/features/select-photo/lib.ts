import { FormikProps } from 'formik'
import { useIntl } from 'react-intl'
import { useSnackbar } from 'entities/snackbar'

const PHOTO_LIMIT = 10

export const useSelectPhoto = <T>(formik: FormikProps<T & { photos: File[] }>) => {
  const { formatMessage } = useIntl()
  const { enqueueSnackbar } = useSnackbar()

  return (files: File[]) => {
    const photos = [...formik.values.photos, ...files]

    if (photos.length > PHOTO_LIMIT) {
      const message = formatMessage(
        { id: 'hook.use-select-photo', defaultMessage: '' },
        { value: PHOTO_LIMIT },
      )
      enqueueSnackbar({ message, severity: 'error', icon: 'error' })
    }

    formik.setFieldValue('photos', photos.slice(0, PHOTO_LIMIT))
  }
}
