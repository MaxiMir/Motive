import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { useAddMessage } from 'entities/user'
import { createTopic } from 'shared/api'
import { TopicSchema } from './schema'

export function useCreateTopicForm(dayId: number, onSuccess: () => void) {
  const addTopic = useAddMessage()
  const { mutateAsync } = useMutation(createTopic, {
    onSuccess(topic) {
      addTopic(topic)
      onSuccess()
    },
  })

  return useFormik({
    initialValues: {
      dayId,
      text: '',
      type: 'support' as const,
    },
    validationSchema: TopicSchema,
    async onSubmit(data) {
      await mutateAsync(data)
    },
  })
}
