import produce from 'immer'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useMutateUserPage, useUserContext } from '@modules/user/hooks'
import { UserPageDto } from '@features/page'
import { UpdateUserDto, UserBaseDto, UserService, getUserHref, profileSchema } from '@features/user'
import { getCurrentSearchParams, setSearchParams } from '@helpers/url'

const getNextState = (page: UserPageDto, user: UserBaseDto): UserPageDto =>
  produce(page, (draft) => {
    draft.name = user.name
    draft.nickname = user.nickname
    draft.avatar = user.avatar
    draft.motto = user.motto
    draft.location = user.location
    draft.bio = user.bio
  })

export const useForm = (onSuccess: () => void) => {
  const { locale } = useIntl()
  const user = useUserContext()
  const router = useRouter()
  const [page, mutatePage] = useMutateUserPage()
  const { formatMessage } = useIntl()
  const nicknameError = formatMessage({ id: 'page.user.modal-profile.nickname-error' })
  const { mutate } = useMutation(UserService.update, {
    async onSuccess(dto) {
      const href = getUserHref(dto.nickname)
      const as = setSearchParams(href, getCurrentSearchParams())
      mutatePage(getNextState(page, dto))
      await router.push(as, as, { shallow: true, locale })
      onSuccess()
    },
  })

  return useFormik<UpdateUserDto>({
    initialValues: {
      name: user.name,
      nickname: user.nickname,
      avatar: user.avatar,
      motto: user.motto,
      location: user.location,
      bio: user.bio,
    },
    validationSchema: profileSchema,
    async onSubmit(data, { setFieldError }) {
      const { id } = user
      const { nickname, avatar, ...restData } = data
      const fetchParams = { where: { nickname }, page: 0, take: 1 }
      const usersDB = user.nickname === nickname ? null : await UserService.get(fetchParams)

      if (usersDB?.length) {
        setFieldError('nickname', nicknameError)
        return
      }

      if (avatar instanceof File) {
        const formData = new FormData()
        formData.append('avatar', avatar)
        await UserService.updateAvatar({ id, formData })
      }

      mutate({ id, data: { nickname, ...restData } })
    },
  })
}
