import { useMutation } from 'react-query'
import { useFormik } from 'formik'
import { searchSchema } from '@modules/search/schemas'
import { SearchDto } from '@features/search'
import { PageService } from '@features/page'

export const useForm = (initial: string) => {
  const { mutateAsync } = useMutation(({ q }: SearchDto) => PageService.getSearch({ params: { q } }), {
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
