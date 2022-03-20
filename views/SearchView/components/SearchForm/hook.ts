import { FormikProps, useFormik } from 'formik'
import { useMutation } from 'react-query'
import { SearchDto } from 'dto'
import { SEARCH } from 'route'
import schema from 'schemas/search'
import PageService from 'services/PageService'
import { setQueryParams } from 'helpers/url'

export default function useForm(q: string): FormikProps<SearchDto> {
  const { mutateAsync } = useSendSearch()

  return useFormik<SearchDto>({
    initialValues: {
      q,
    },
    validationSchema: schema,
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
