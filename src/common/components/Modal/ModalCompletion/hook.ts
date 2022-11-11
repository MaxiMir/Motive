import { FormikProps, useFormik } from 'formik'
import { useMutation } from 'react-query'
import { useIntl } from 'react-intl'
import { GoalDto } from '@dto'
import { completionSchema } from '@schemas/completion'
import { ConfirmationService } from '@services/confirmation'
import { getToday } from '@utils/date'
import { scrollToElem } from '@helpers/dom'
import useSnackbar from '@hooks/useSnackbar'
import { useUserPage } from '@modules/user/hook'

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
    validationSchema: completionSchema,
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
  const { formatMessage } = useIntl()
  const { refetch } = useUserPage()
  const [enqueueSnackbar] = useSnackbar()

  return useMutation(ConfirmationService.create, {
    onSuccess() {
      const message = formatMessage({ id: 'component.modal-completion.message' })

      onSuccess()
      setTimeout(() => scrollToElem('main'), 0)
      setTimeout(refetch, 300)
      enqueueSnackbar({ message, severity: 'success', icon: 'bug' })
    },
  })
}
