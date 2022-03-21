import { useRouter } from 'next/router'
import { FormikProps, useFormik } from 'formik'
import { useMutation } from 'react-query'
import { UpdateUserDto, UserBaseDto } from 'dto'
import schema from 'schemas/profile'
import UserService from 'services/UserService'
import { getQueryParams, setQueryParams } from 'helpers/url'
import { getUserHref } from 'views/UserView/helper'
import { useMutateUserPage } from 'views/UserView/hook'
import { getNextState } from './helper'

export default function useForm(user: UserBaseDto, onSuccess: () => void): FormikProps<UpdateUserDto> {
  const { id, name, nickname, avatar } = user
  const { mutateAsync } = useSendUpdateUser()
  return useFormik<UpdateUserDto>({
    initialValues: {
      name,
      nickname,
      avatar,
    },
    validationSchema: schema,
    async onSubmit(data) {
      const formData = new FormData()

      formData.append('name', data.name)
      formData.append('nickname', data.nickname)
      formData.append('avatar', data.avatar || '')
      await mutateAsync({ id, formData })
      onSuccess()
    },
  })
}

const useSendUpdateUser = () => {
  const router = useRouter()
  const [page, mutatePage] = useMutateUserPage()

  return useMutation(UserService.update, {
    async onSuccess(user) {
      const userBaseHref = getUserHref(user.nickname)
      const as = setQueryParams(userBaseHref, getQueryParams())
      mutatePage(getNextState(page, user))

      await router.push(as, as, { shallow: true })
    },
  })
}
