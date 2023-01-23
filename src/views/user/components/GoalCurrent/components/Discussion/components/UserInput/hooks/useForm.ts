import { useFormik } from 'formik'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useSnackbar } from '@modules/snackbar'
import { useGoalContext } from '@views/user/components/GoalCurrent/hooks/useGoalContext'
import { CreateMessageDto, MessageType, TopicDto, TopicService } from '@modules/topic'

export const useForm = (
  topicId: number | undefined,
  type: MessageType,
  onAdd: (topic: TopicDto) => void,
) => {
  const { formatMessage } = useIntl()
  const { day } = useGoalContext()
  const { enqueueSnackbar } = useSnackbar()
  const { mutateAsync } = useMutation(TopicService.create, {
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
