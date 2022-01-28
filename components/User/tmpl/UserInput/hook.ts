import { useFormik } from 'formik'
import { TopicCreationDto, TopicDto, TopicType } from 'dto'
import { UseFormType } from 'types'
import useSend from 'hooks/useSend'
import TopicService from 'services/TopicService'
import useSnackbar from 'hooks/useSnackbar'
import schema from 'schemas/topic'

export default function useForm(
  dayId: number,
  answer: number | undefined,
  type: TopicType,
  onAdd: (topic: TopicDto) => void,
): UseFormType<TopicCreationDto> {
  const { isLoading, send } = useSendTopic(type, onSuccess)
  const formik = useFormik<TopicCreationDto>({
    initialValues: {
      dayId,
      text: '',
      answer,
      type,
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

const useSendTopic = (type: TopicType, onSuccess: (topic: TopicDto) => void) => {
  const { enqueueSnackbar } = useSnackbar()

  return useSend(TopicService.create, {
    onSuccess(topic) {
      enqueueSnackbar({
        message: `${type === TopicType.QUESTION ? 'Question' : 'Answer'} added`,
        severity: 'success',
        icon: 'speaker',
      })
      onSuccess(topic)
    },
  })
}
