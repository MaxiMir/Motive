import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useFormik } from 'formik'
import { useSnackbar } from '@entities/snackbar'
import { useGoalContext } from '@pages/user/components/GoalCurrent/hooks/useGoalContext'
import { createTopic } from '@entities/topic'
import { CreateMessageDto, MessageType, TopicDto } from '@shared/api/topic'

export const useForm = (
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
      enqueueSnackbar({ message, severity: 'success', icon: 'speaker' })
    },
  })

  return useFormik<CreateMessageDto>({
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
