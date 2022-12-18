import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { formatISO } from 'date-fns'
import { useFormik } from 'formik'
import { getMidnight } from '@lib/date'
import { useUserPage } from '@modules/user/hooks'
import { useGoalContext } from '@modules/user/components/GoalCurrent/hooks'
import { confirmationSchema } from '@features/confirmation/schema'
import { ConfirmationService } from '@features/confirmation/service'
import useSnackbar from '@hooks/useSnackbar'
import { scrollToElem } from '@helpers/document'

interface Values {
  text: string
  photos: File[]
  video: ''
  goalId: number
  end: Date
}

export const useForm = (onSuccess: () => void) => {
  const { formatMessage } = useIntl()
  const { id } = useGoalContext()
  const { refetch } = useUserPage()
  const [enqueueSnackbar] = useSnackbar()
  const { mutate } = useMutation(ConfirmationService.create, {
    onSuccess() {
      const message = formatMessage({ id: 'component.modal-completion.message' })
      onSuccess()
      setTimeout(() => scrollToElem('main'), 0)
      setTimeout(refetch, 300)
      enqueueSnackbar({ message, severity: 'success', icon: 'bug' })
    },
  })

  return useFormik<Values>({
    initialValues: {
      text: '',
      photos: [],
      video: '',
      goalId: id,
      end: getMidnight(),
    },
    validationSchema: confirmationSchema,
    async onSubmit(data) {
      const formData = new FormData()
      formData.append('text', data.text.trim())
      formData.append('end', formatISO(data.end))
      formData.append('goalId', data.goalId.toString())
      data.photos.forEach((photo) => formData.append('photos', photo))
      mutate(formData)
    },
  })
}
