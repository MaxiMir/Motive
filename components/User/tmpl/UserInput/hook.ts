import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { CreateMessageDto, TopicDto, MessageType } from 'dto'
import { UseFormType } from 'types'
import TopicService from 'services/TopicService'
import useSnackbar from 'hooks/useSnackbar'
import schema from 'schemas/message'

export default function useForm(
  dayId: number,
  topicId: number | undefined,
  type: MessageType,
  onAdd: (topic: TopicDto) => void,
): UseFormType<CreateMessageDto> {
  const { isLoading, mutate } = useSendTopic(type, onSuccess)
  const formik = useFormik<CreateMessageDto>({
    initialValues: {
      dayId,
      text: '',
      topicId,
      type,
    },
    validationSchema: schema,
    async onSubmit(data) {
      mutate(data)
    },
  })

  function onSuccess(topic: TopicDto) {
    formik.resetForm()
    onAdd(topic)
  }

  return { isLoading, formik }
}

const useSendTopic = (type: MessageType, onSuccess: (topic: TopicDto) => void) => {
  const { enqueueSnackbar } = useSnackbar()

  return useMutation(TopicService.create, {
    onSuccess(topic) {
      enqueueSnackbar({
        message: `${type === MessageType.QUESTION ? 'Question' : 'Answer'} added`,
        severity: 'success',
        icon: 'speaker',
      })
      onSuccess(topic)
    },
  })
}
