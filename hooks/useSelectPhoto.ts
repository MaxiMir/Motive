import { FormikProps } from 'formik'
import i18n from 'constants/i18n'
import useSnackbar from 'hooks/useSnackbar'
import useLocale from 'hooks/useLocale'

const PHOTO_LIMIT = 6

export default function useSelectPhoto<T>(formik: FormikProps<T & { photos: File[] }>): (files: File[]) => void {
  const { locale } = useLocale()
  const [enqueueSnackbar] = useSnackbar()

  return (files: File[]) => {
    const photos = [...formik.values.photos, ...files]

    if (photos.length > PHOTO_LIMIT) {
      const { getLimitPhotosError } = i18n[locale]
      const message = getLimitPhotosError(PHOTO_LIMIT)

      enqueueSnackbar({ message, severity: 'error' })
    }

    formik.setFieldValue('photos', photos.slice(0, PHOTO_LIMIT))
  }
}
