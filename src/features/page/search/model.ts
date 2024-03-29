import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { getSearchPage } from 'shared/api'
import { searchSchema } from './schema'

interface SearchDto {
  q: string
}

export function useSearchForm(initial: string) {
  const { mutateAsync } = useMutation(({ q }: SearchDto) => getSearchPage({ params: { q } }), {
    onSuccess(res) {
      console.log('data', res)
    },
  })

  return useFormik<SearchDto>({
    initialValues: {
      q: initial,
    },
    validationSchema: searchSchema,
    onSubmit(data) {
      return mutateAsync(data)
    },
  })
}
