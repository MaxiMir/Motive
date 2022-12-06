import { useMutation } from 'react-query'
import { useFormik } from 'formik'
import { SearchDto } from '@dto'
import searchSchema from '@schemas/search'
import { PageService } from '@features/page'

const useForm = (initial: string) => {
  const { mutate } = useMutation(({ q }: SearchDto) => PageService.getSearch({ params: { q } }), {
    onSuccess(data) {
      console.log('data', data)
    },
  })

  return useFormik<SearchDto>({
    initialValues: {
      q: initial,
    },
    validationSchema: searchSchema,
    onSubmit(data) {
      mutate(data)
    },
  })
}

export default useForm
