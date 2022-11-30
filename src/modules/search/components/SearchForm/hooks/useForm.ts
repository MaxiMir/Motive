import { useMutation } from 'react-query'
import { useFormik } from 'formik'
import { SearchDto } from '@dto'
import searchSchema from '@schemas/search'
import { Route } from '@href'
import PageService from '@services/page'
import { setSearchParams } from '@helpers/url'

const useForm = (initial: string) => {
  const { mutate } = useMutation(({ q }: SearchDto) => PageService.get(setSearchParams(Route.Search, { q })), {
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
