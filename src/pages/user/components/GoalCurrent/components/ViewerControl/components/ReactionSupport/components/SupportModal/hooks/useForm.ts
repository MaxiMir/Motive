import { useMutation } from 'react-query'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { useAddMessage } from '@pages/user/hooks'
import { useGoalContext } from '@pages/user/components/GoalCurrent/hooks/useGoalContext'
import { MessageType, TopicService } from '@entities/topic'

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
    validationSchema: object({
      text: string().required('The message is needed').min(5).max(1000),
    }),
    async onSubmit(data) {
      await mutateAsync(data)
    },
  })
}
