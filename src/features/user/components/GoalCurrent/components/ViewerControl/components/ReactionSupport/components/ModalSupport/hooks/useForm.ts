import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { MessageType } from '@dto'
import { messageSchema } from '@features/user/schemas'
import { useAddMessage } from '@features/user/hooks'
import { useGoalContext } from '@features/user/components/GoalCurrent/hooks'
import TopicService from '@services/topic'

export const useForm = (onSuccess: () => void) => {
  const { day } = useGoalContext()
  const addTopic = useAddMessage()
  const { mutate } = useMutation(TopicService.create, {
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
    validationSchema: messageSchema,
    onSubmit(data) {
      mutate(data)
    },
  })
}
