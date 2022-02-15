import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { MessageDto, TopicUpdateDto } from 'dto'
import { UseFormType } from 'types'
import TopicService from 'services/TopicService'
import schema from 'schemas/message'

export default function useForm(message: MessageDto, onClose: () => void): UseFormType<TopicUpdateDto> {
  const { isLoading, mutate } = useSendSupport(message, onClose)
  const formik = useFormik<TopicUpdateDto>({
    initialValues: {
      id: message.id,
      text: message.text,
    },
    validationSchema: schema,
    async onSubmit(data) {
      mutate(data)
    },
  })

  return { isLoading, formik }
}

const useSendSupport = (message: MessageDto, onClose: () => void) => {
  return useMutation(TopicService.update, {
    onSuccess(topic) {
      console.log('topic', topic, message)
      onClose()
    },
  })
}
