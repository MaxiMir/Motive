import { FormikProps } from 'formik'
import { useIntl } from 'react-intl'
import { useSnackbar } from 'shared/ui/snackbar'

const PHOTO_LIMIT = 10

export const usePhotoLimit = <T>(formik: FormikProps<T & { photos: File[] }>) => {
  const { formatMessage } = useIntl()
  const { enqueueSnackbar } = useSnackbar()

  return (files: File[]) => {
    const photos = [...formik.values.photos, ...files]

    if (photos.length > PHOTO_LIMIT) {
      const message = formatMessage(
        { id: 'hook.use-select-photo', defaultMessage: '' },
        { value: PHOTO_LIMIT },
      )
      enqueueSnackbar(message, { severity: 'error', icon: '☠️' })
    }

    formik.setFieldValue('photos', photos.slice(0, PHOTO_LIMIT))
  }
}
