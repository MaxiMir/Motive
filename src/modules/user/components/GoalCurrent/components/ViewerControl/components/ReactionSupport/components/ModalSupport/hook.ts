import { FormikProps, useFormik } from 'formik'
import { useMutation } from 'react-query'
import { GoalDto, CreateMessageDto, MessageType } from 'src/common/dto'
import validationSchema from 'src/common/schemas/message'
import { TopicService } from 'src/common/services/topic'
import { useAddMessage } from '@modules/user/components/GoalCurrent/components/Discussion/hook'

export default function useForm(goal: GoalDto, onSuccess: () => void): FormikProps<CreateMessageDto> {
  const { day } = goal
  const { mutateAsync } = useSendSupport()

  return useFormik<CreateMessageDto>({
    initialValues: {
      dayId: day.id,
      text: '',
      type: MessageType.Support,
    },
    validationSchema,
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
