import { useRouter } from 'next/router'
import { FormikProps, useFormik } from 'formik'
import { useMutation } from 'react-query'
import { UpdateUserDto, UserBaseDto } from 'dto'
import schema from 'schemas/profile'
import { Locale } from 'hooks/useLocale'
import UserService from 'services/UserService'
import { getQueryParams, setQueryParams, getUserHref } from 'helpers/url'

import { useMutateUserPage } from 'pages/[id]/hook'
import { getNextState } from './helper'
import i18n from './i18n'

export default function useForm(user: UserBaseDto, locale: Locale, onSuccess: () => void): FormikProps<UpdateUserDto> {
  const { mutateAsync } = useSendUpdateUser(locale)
  const { nicknameError } = i18n[locale]

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

const useSendUpdateUser = (locale: Locale) => {
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
