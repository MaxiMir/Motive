import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { GoalDto, MessageType } from '@dto'
import messageSchema from '@schemas/message'
import useAddMessage from '@features/user/hooks/useAddMessage'
import TopicService from '@services/topic'

const useForm = (goal: GoalDto, onSuccess: () => void) => {
  const { day } = goal
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

export default useForm
