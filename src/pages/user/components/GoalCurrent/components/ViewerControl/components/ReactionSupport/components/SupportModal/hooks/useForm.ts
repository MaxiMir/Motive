import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { useGoalContext } from '@pages/user/components/GoalCurrent/hooks/useGoalContext'
import { useAddMessage } from '@pages/user/hooks'
import { topicSchema, createTopic } from '@entities/topic'
import { MessageType } from '@shared/api/topic'

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
