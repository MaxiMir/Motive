import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { TopicCreationDto, TopicDto, MessageType } from 'dto'
import { UseFormType } from 'types'
import TopicService from 'services/TopicService'
import useSnackbar from 'hooks/useSnackbar'
import schema from 'schemas/topic'

export default function useForm(
  dayId: number,
  topicId: number | undefined,
  type: MessageType,
  onAdd: (topic: TopicDto) => void,
): UseFormType<TopicCreationDto> {
  const { isLoading, mutate } = useSendTopic(type, onSuccess)
  const formik = useFormik<TopicCreationDto>({
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
