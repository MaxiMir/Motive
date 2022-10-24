import { FormikProps, useFormik } from 'formik'
import { useMutation } from 'react-query'
import { useIntl } from 'react-intl'
import { GoalDto } from 'dto'
import schema from 'schemas/completion'
import ConfirmationService from 'services/ConfirmationService'
import useSnackbar from 'hooks/useSnackbar'
import { scrollToElem } from 'helpers/dom'
import { getToday } from 'helpers/date'
import { useUserPage } from 'pages/[id]/hook'
import i18n from './i18n'

interface Values {
  text: string
  photos: File[]
  video: ''
  goalId: number
  end: Date
}

export default function useForm(goal: GoalDto, onSuccess: () => void): FormikProps<Values> {
  const { mutateAsync } = useSendConfirmation(onSuccess)

  return useFormik<Values>({
    initialValues: {
      text: '',
      photos: [],
      video: '',
      goalId: goal.id,
      end: getToday(),
    },
    validationSchema: schema,
    async onSubmit(data) {
      const formData = new FormData()
      formData.append('text', data.text.trim())
      formData.append('end', data.end.toISOString())
      formData.append('goalId', data.goalId.toString())
      data.photos.forEach((photo) => formData.append('photos', photo))
      await mutateAsync(formData)
    },
  })
}

const useSendConfirmation = (onSuccess: () => void) => {
  const { locale } = useIntl()
  const { refetch } = useUserPage()
  const [enqueueSnackbar] = useSnackbar()
  const { message } = i18n[locale]

  return useMutation(ConfirmationService.create, {
    onSuccess() {
      onSuccess()
      setTimeout(() => scrollToElem('main'), 0)
      setTimeout(refetch, 300)
      enqueueSnackbar({ message, severity: 'success', icon: 'bug' })
    },
  })
}
