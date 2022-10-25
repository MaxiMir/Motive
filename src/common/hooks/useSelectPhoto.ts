import { FormikProps } from 'formik'
import { useIntl } from 'react-intl'
import i18nCommon from 'constants/i18n'
import useSnackbar from 'src/common/hooks/useSnackbar'

const PHOTO_LIMIT = 10

export default function useSelectPhoto<T>(formik: FormikProps<T & { photos: File[] }>): (files: File[]) => void {
  const { locale } = useIntl()
  const [enqueueSnackbar] = useSnackbar()

  return (files: File[]) => {
    const photos = [...formik.values.photos, ...files]

    if (photos.length > PHOTO_LIMIT) {
      const { getLimitPhotosError } = i18nCommon[locale]
      const message = getLimitPhotosError(PHOTO_LIMIT)

      enqueueSnackbar({ message, severity: 'error' })
    }

    formik.setFieldValue('photos', photos.slice(0, PHOTO_LIMIT))
  }
}
