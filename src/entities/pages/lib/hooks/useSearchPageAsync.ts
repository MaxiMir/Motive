import { useMutation } from 'react-query'
import { useFormik } from 'formik'
import { getSearchPage } from '@entities/pages/api/getSearchPage'
import { searchSchema } from '@entities/pages/config/searchSchema'

interface SearchDto {
  q: string
}

export const useSearchPageAsync = (initial: string) => {
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
