import { useFormik } from 'formik'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useAddMessage } from 'entities/user'
import { CreateTopicDto, TopicType, createTopic } from 'shared/api'
import { useSnackbar } from 'shared/ui/snackbar'

export const useCreateTopicForm = (
  dayId: number,
  topicId: number | undefined,
  type: TopicType,
  onSuccess?: () => void,
) => {
  const { formatMessage } = useIntl()
  const onAdd = useAddMessage()
  const { enqueueSnackbar } = useSnackbar()
  const { mutateAsync } = useMutation(createTopic, {
    onSuccess() {
      const message = formatMessage({ id: 'common.message-added' })
      enqueueSnackbar({ message, severity: 'success', icon: '🧞‍♂️️‍' })
    },
  })

  return useFormik<CreateTopicDto>({
    initialValues: {
      dayId,
      text: '',
      topicId,
      type,
    },
    async onSubmit(data, { resetForm }) {
      const topic = await mutateAsync(data)
      onAdd(topic)
      onSuccess?.()
      resetForm()
    },
  })
}
