import { useMutation } from 'react-query'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { getSearchPage } from '@entities/pages/api/getSearchPage'

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
    validationSchema: object({ q: string() }),
    async onSubmit(data) {
      await mutateAsync(data)
    },
  })
}
