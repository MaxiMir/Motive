import { useFormik } from 'formik'
import { TopicCreationDto, TopicDto, TopicType } from 'dto'
import { UseFormType } from 'types'
import useSend from 'hooks/useSend'
import TopicService from 'services/TopicService'
import useSnackbar from 'hooks/useSnackbar'
import schema from 'schemas/topic'

export default function useForm(
  dayId: number,
  answer: boolean | undefined,
  messageType: string,
  onAdd: (topic: TopicDto) => void,
): UseFormType<TopicCreationDto> {
  const { isLoading, send } = useSendTopic(messageType, onSuccess)
  const formik = useFormik<TopicCreationDto>({
    initialValues: {
      dayId,
      message: '',
      type: answer ? TopicType.SUPPORT : TopicType.QUESTION,
    },
    validationSchema: schema,
    async onSubmit(data) {
      send(data)
    },
  })

  function onSuccess(topic: TopicDto) {
    formik.resetForm()
    onAdd(topic)
  }

  return { isLoading, formik }
}

const useSendTopic = (messageType: string, onSuccess: (topic: TopicDto) => void) => {
  const { enqueueSnackbar } = useSnackbar()

  return useSend(TopicService.create, {
    onSuccess(topic) {
      enqueueSnackbar({ message: `${messageType} added`, severity: 'success', icon: 'speaker' })
      onSuccess(topic)
    },
  })
}
