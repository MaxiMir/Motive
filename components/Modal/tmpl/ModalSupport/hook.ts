import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { GoalDto, CreateMessageDto, MessageType } from 'dto'
import { UseFormType } from 'types'
import TopicService from 'services/TopicService'
import { useAddMessage } from 'components/Goal/tmpl/GoalCurrent/components/Discussion/hook'
import schema from 'schemas/message'

export default function useForm(goal: GoalDto, onSuccess: () => void): UseFormType<CreateMessageDto> {
  const { day } = goal
  const { isLoading, mutate } = useSendSupport(onSuccess)
  const formik = useFormik<CreateMessageDto>({
    initialValues: {
      dayId: day.id,
      text: '',
      type: MessageType.SUPPORT,
    },
    validationSchema: schema,
    async onSubmit(data) {
      mutate(data)
    },
  })

  return { isLoading, formik }
}

const useSendSupport = (onSuccess: () => void) => {
  const addTopic = useAddMessage()
  return useMutation(TopicService.create, {
    onSuccess(topic) {
      addTopic(topic)
      onSuccess()
    },
  })
}
