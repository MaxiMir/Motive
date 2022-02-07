import { useFormik } from 'formik'
import { GoalDto, TopicCreationDto, TopicType } from 'dto'
import { UseFormType } from 'types'
import TopicService from 'services/TopicService'
import useSend from 'hooks/useSend'
import schema from 'schemas/topic'

export default function useForm(goal: GoalDto, onClose: () => void): UseFormType<TopicCreationDto> {
  const { day } = goal
  const { isLoading, send } = useSendSupport(onClose)
  const formik = useFormik<TopicCreationDto>({
    initialValues: {
      dayId: day.id,
      text: '',
      type: TopicType.SUPPORT,
    },
    validationSchema: schema,
    async onSubmit(data) {
      send(data)
    },
  })

  return { isLoading, formik }
}

const useSendSupport = (onClose: () => void) => {
  return useSend(TopicService.create, {
    onSuccess(_) {
      onClose()
    },
  })
}
