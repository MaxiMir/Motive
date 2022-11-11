import { FormikProps, useFormik } from 'formik'
import { useMutation } from 'react-query'
import { SearchDto } from '@dto'
import { Route } from '@href'
import { PageService } from '@services/page'
import { searchSchema } from '@schemas/search'
import { setQueryParams } from '@helpers/url'

export default function useForm(q: string): FormikProps<SearchDto> {
  const { mutateAsync } = useSendSearch()

  return useFormik<SearchDto>({
    initialValues: {
      q,
    },
    validationSchema: searchSchema,
    async onSubmit(data) {
      await mutateAsync(data)
    },
  })
}

const useSendSearch = () => {
  return useMutation(({ q }: SearchDto) => PageService.get(setQueryParams(Route.Search, { q })), {
    onSuccess(data) {
      console.log('data', data)
      // addTopic(topic)
    },
  })
}
