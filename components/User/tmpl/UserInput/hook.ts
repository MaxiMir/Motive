import { FormikProps, useFormik } from 'formik'
import { useMutation } from 'react-query'
import { CreateMessageDto, MessageType, TopicDto } from 'dto'
import schema from 'schemas/message'
import TopicService from 'services/TopicService'
import useSnackbar from 'hooks/useSnackbar'

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
    validationSchema: schema,
    async onSubmit(data, { resetForm }) {
      const topic = await mutateAsync(data)
      onAdd(topic)
      resetForm()
    },
  })
}

const useSendTopic = (type: MessageType) => {
  const [enqueueSnackbar] = useSnackbar()

  return useMutation(TopicService.create, {
    onSuccess() {
      enqueueSnackbar({
        message: `${type === MessageType.QUESTION ? 'Question' : 'Answer'} added`,
        severity: 'success',
        icon: 'speaker',
      })
    },
  })
}
