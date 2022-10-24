import { FormikProps, useFormik } from 'formik'
import { useMutation } from 'react-query'
import { useIntl } from 'react-intl'
import { CreateMessageDto, MessageType, TopicDto } from 'dto'
import TopicService from 'services/TopicService'
import useSnackbar from 'hooks/useSnackbar'
import i18n from './i18n'

export default function useForm(
  dayId: number,
  topicId: number | undefined,
  type: MessageType,
  onAdd: (topic: TopicDto) => void,
): FormikProps<CreateMessageDto> {
  const { mutateAsync } = useSendTopic(type)

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

const useSendTopic = (type: MessageType) => {
  const { locale } = useIntl()
  const [enqueueSnackbar] = useSnackbar()

  return useMutation(TopicService.create, {
    onSuccess() {
      const { getMessage } = i18n[locale]
      const message = getMessage(type === MessageType.Question)

      enqueueSnackbar({ message, severity: 'success', icon: 'speaker' })
    },
  })
}
