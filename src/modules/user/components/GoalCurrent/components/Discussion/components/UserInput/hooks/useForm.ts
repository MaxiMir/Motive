import { useFormik } from 'formik'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { CreateMessageDto, MessageType, TopicDto } from '@dto'
import TopicService from '@services/topic'
import useSnackbar from '@hooks/useSnackbar'

const useForm = (dayId: number, topicId: number | undefined, type: MessageType, onAdd: (topic: TopicDto) => void) => {
  const { formatMessage } = useIntl()
  const [enqueueSnackbar] = useSnackbar()
  const { mutateAsync } = useMutation(TopicService.create, {
    onSuccess() {
      const message = formatMessage({ id: `page.user.user-input.message-${type}` })
      enqueueSnackbar({ message, severity: 'success', icon: 'speaker' })
    },
  })

  return useFormik<CreateMessageDto>({
    initialValues: {
      dayId,
      text: '',
      topicId,
      type,
    },
    async onSubmit(data, { resetForm }) {
      const topic = await mutateAsync(data)
      onAdd(topic)
      resetForm()
    },
  })
}

export default useForm
