import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { useAddMessage } from '@pages/user/hooks'
import { useGoalContext } from '@pages/user/components/GoalCurrent/hooks/useGoalContext'
import { MessageType, TopicService, topicSchema } from '@entities/topic'

export const useForm = (onSuccess: () => void) => {
  const { day } = useGoalContext()
  const addTopic = useAddMessage()
  const { mutateAsync } = useMutation(TopicService.create, {
    onSuccess(topic) {
      addTopic(topic)
      onSuccess()
    },
  })

  return useFormik({
    initialValues: {
      dayId: day.id,
      text: '',
      type: MessageType.Support,
    },
    validationSchema: topicSchema,
    async onSubmit(data) {
      await mutateAsync(data)
    },
  })
}
