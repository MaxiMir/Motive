import { FormikProps, useFormik } from 'formik'
import { useMutation } from 'react-query'
import { SearchDto } from 'dto'
import schema from 'schemas/search'
import TopicService from 'services/TopicService'

export default function useForm(q: string): FormikProps<SearchDto> {
  const { mutateAsync } = useSendSupport()

  return useFormik<SearchDto>({
    initialValues: {
      q,
    },
    validationSchema: schema,
    async onSubmit(data) {
      await new Promise((r) => setTimeout(r, 3000))
      // await mutateAsync(data)
    },
  })
}

const useSendSupport = () => {
  // const addTopic = useAddMessage()

  return useMutation(TopicService.create, {
    onSuccess(topic) {
      // addTopic(topic)
    },
  })
}
