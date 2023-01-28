import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { getSearchPage, searchSchema } from 'shared/api'

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
