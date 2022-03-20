import { FormikProps, useFormik } from 'formik'
import { useMutation } from 'react-query'
import { GoalDto, CreateMessageDto, MessageType } from 'dto'
import schema from 'schemas/message'
import TopicService from 'services/TopicService'
import { useAddMessage } from 'components/Goal/tmpl/GoalCurrent/components/Discussion/hook'

export default function useForm(goal: GoalDto, onSuccess: () => void): FormikProps<CreateMessageDto> {
  const { day } = goal
  const { mutateAsync } = useSendSupport()

  return useFormik<CreateMessageDto>({
    initialValues: {
      dayId: day.id,
      text: '',
      type: MessageType.SUPPORT,
    },
    validationSchema: schema,
    async onSubmit(data) {
      await mutateAsync(data)
      onSuccess()
    },
  })
}

const useSendSupport = () => {
  const addTopic = useAddMessage()

  return useMutation(TopicService.create, {
    onSuccess(topic) {
      addTopic(topic)
    },
  })
}
