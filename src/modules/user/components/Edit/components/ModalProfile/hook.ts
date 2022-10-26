import { useRouter } from 'next/router'
import { FormikProps, useFormik } from 'formik'
import { useMutation } from 'react-query'
import { useIntl } from 'react-intl'
import { UpdateUserDto, UserBaseDto } from '@dto'
import { profileSchema } from '@schemas/profile'
import { UserService } from '@services/user'
import { getQueryParams, setQueryParams, getUserHref } from '@helpers/url'
import { useMutateUserPage } from '@modules/user/hook'
import { getNextState } from './helper'

export default function useForm(user: UserBaseDto, onSuccess: () => void): FormikProps<UpdateUserDto> {
  const { formatMessage } = useIntl()
  const { mutateAsync } = useSendUpdateUser()
  const nicknameError = formatMessage({ id: 'page.user.modal-profile.nickname-error' })

  return useFormik<UpdateUserDto>({
    initialValues: {
      name: user.name,
      nickname: user.nickname,
      avatar: user.avatar,
    },
    validationSchema: profileSchema,
    async onSubmit(data, { setFieldError }) {
      const { id } = user
      const { name, nickname, avatar } = data
      const usersDB = user.nickname === nickname ? null : await UserService.get({ nickname }, 0, 1)

      if (usersDB?.length) {
        setFieldError('nickname', nicknameError)
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
  const { locale } = useIntl()
  const router = useRouter()
  const [page, mutatePage] = useMutateUserPage()

  return useMutation(UserService.update, {
    async onSuccess(user) {
      const href = getUserHref(user.nickname)
      const as = setQueryParams(href, getQueryParams())

      mutatePage(getNextState(page, user))
      await router.push(as, as, { shallow: true, locale })
    },
  })
}
