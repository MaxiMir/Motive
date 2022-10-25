import { FormikProps, useFormik } from 'formik'
import { useMutation } from 'react-query'
import { SearchDto } from 'src/common/dto'
import { SEARCH } from 'route'
import validationSchema from 'src/common/schemas/search'
import { PageService } from 'src/common/services/page'
import { setQueryParams } from 'src/common/helpers/url'

export default function useForm(q: string): FormikProps<SearchDto> {
  const { mutateAsync } = useSendSearch()

  return useFormik<SearchDto>({
    initialValues: {
      q,
    },
    validationSchema,
    async onSubmit(data) {
      await mutateAsync(data)
    },
  })
}

const useSendSearch = () => {
  return useMutation(({ q }: SearchDto) => PageService.get(setQueryParams(SEARCH, { q })), {
    onSuccess(data) {
      console.log('data', data)
      // addTopic(topic)
    },
  })
}
