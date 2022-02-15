import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { GoalDto, CreateTopicDto, MessageType } from 'dto'
import { UseFormType } from 'types'
import TopicService from 'services/TopicService'
import { useAddTopic } from 'components/Goal/tmpl/GoalCurrent/components/Discussion/hook'
import schema from 'schemas/message'

export default function useForm(goal: GoalDto, onClose: () => void): UseFormType<CreateTopicDto> {
  const { day } = goal
  const { isLoading, mutate } = useSendSupport(goal, onClose)
  const formik = useFormik<CreateTopicDto>({
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

const useSendSupport = (goal: GoalDto, onClose: () => void) => {
  const addTopic = useAddTopic(goal.id, goal.day.id)
  return useMutation(TopicService.create, {
    onSuccess(topic) {
      addTopic(topic)
      onClose()
    },
  })
}
