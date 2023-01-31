import { useFormik } from 'formik'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useGoalContext } from 'entities/goal'
import { CreateTopicDto, MessageType, TopicDto, createTopic } from 'shared/api'
import { useSnackbar } from 'shared/ui/snackbar'

export const useCreateTopic = (
  topicId: number | undefined,
  type: MessageType,
  onAdd: (topic: TopicDto) => void,
) => {
  const { formatMessage } = useIntl()
  const { day } = useGoalContext()
  const { enqueueSnackbar } = useSnackbar()
  const { mutateAsync } = useMutation(createTopic, {
    onSuccess() {
      const message = formatMessage({ id: `page.user.user-input.message-${type}` })
      enqueueSnackbar({ message, severity: 'success', icon: '🧞‍♂️️‍' })
    },
  })

  return useFormik<CreateTopicDto>({
    initialValues: {
      dayId: day.id,
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
