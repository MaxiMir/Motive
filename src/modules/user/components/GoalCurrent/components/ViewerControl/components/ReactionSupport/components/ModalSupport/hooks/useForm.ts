import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { GoalDto, MessageType } from '@dto'
import messageSchema from '@schemas/message'
import TopicService from '@services/topic'
import useAddMessage from '@user-hooks/useAddMessage'

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
