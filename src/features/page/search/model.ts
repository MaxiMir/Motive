import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { getSearchPage } from 'shared/api'
import { searchSchema } from './schema'

interface SearchDto {
  q: string
}

export const useSearchForm = (initial: string) => {
  const { mutateAsync } = useMutation(({ q }: SearchDto) => getSearchPage({ params: { q } }), {
    onSuccess(data) {
      console.log('data', data)
    },
  })

  return useFormik<SearchDto>({
    initialValues: {
      q: initial,
    },
    validationSchema: searchSchema,
    async onSubmit(data) {
      await mutateAsync(data)
    },
  })
}