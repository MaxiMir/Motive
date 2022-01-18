import { FormikProps } from 'formik'
import useSnackbar from 'hooks/useSnackbar'

const PHOTO_LIMIT = 10

export default function useSelectPhoto<T>(formik: FormikProps<T & { photos: File[] }>): (files: File[]) => void {
  const { enqueueSnackbar } = useSnackbar()

  return (files: File[]) => {
    const photos = [...formik.values.photos, ...files]

    if (photos.length > PHOTO_LIMIT) {
      enqueueSnackbar({ message: `You cannot add more than ${PHOTO_LIMIT} photos`, severity: 'error' })
    }

    formik.setFieldValue('photos', photos.slice(0, PHOTO_LIMIT))
  }
}
