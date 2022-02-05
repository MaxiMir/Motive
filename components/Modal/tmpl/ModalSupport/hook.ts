import { useFormik } from 'formik'
import { TopicCreationDto, TopicType } from 'dto'
import { UseFormType } from 'types'
import TopicService from 'services/TopicService'
import useSend from 'hooks/useSend'
import schema from 'schemas/topic'

export default function useForm(dayId: number, onClose: () => void): UseFormType<TopicCreationDto> {
  const { isLoading, send } = useSendSupport(onClose)
  const formik = useFormik<TopicCreationDto>({
    initialValues: {
      dayId,
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
