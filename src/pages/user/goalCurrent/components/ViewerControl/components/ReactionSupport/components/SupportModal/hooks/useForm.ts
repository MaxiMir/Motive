import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { useGoalContext } from 'entities/goal'
import { useAddMessage } from 'entities/user'
import { MessageType, topicSchema, createTopic } from 'shared/api'

export const useForm = (onSuccess: () => void) => {
  const { day } = useGoalContext()
  const addTopic = useAddMessage()
  const { mutateAsync } = useMutation(createTopic, {
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
