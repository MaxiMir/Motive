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
  const { mutateAsync } = useSendUpdateUser()
  return useFormik<UpdateUserDto>({
    initialValues: {
      name: user.name,
      nickname: user.nickname,
      avatar: user.avatar,
    },
    validationSchema: schema,
    async onSubmit(data, { setFieldError }) {
      const { id } = user
      const { name, nickname, avatar } = data
      const usersDB = user.nickname === nickname ? null : await UserService.find({ nickname }, 0, 1)

      if (usersDB?.length) {
        setFieldError('nickname', 'nickname is busy')
        return
      }

      if (avatar instanceof File) {
        const formData = new FormData()
        formData.append('avatar', avatar)
        await UserService.updateAvatar({ id, formData })
      }

      await mutateAsync({ id, data: { name, nickname } })
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
