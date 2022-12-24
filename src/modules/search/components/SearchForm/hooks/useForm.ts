import { useMutation } from 'react-query'
import { useFormik } from 'formik'
import { SearchDto, searchSchema } from '@features/search'
import { PageService } from '@features/page'

export const useForm = (initial: string) => {
  const { mutateAsync } = useMutation(
    ({ q }: SearchDto) => PageService.getSearch({ params: { q } }),
    {
      onSuccess(data) {
        console.log('data', data)
      },
    },
  )

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
