import produce from 'immer'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { getUserHref } from '@href'
import { UpdateUserDto, UserBaseDto, UserPageDto } from '@dto'
import profileSchema from '@schemas/profile'
import UserService from '@services/user'
import { getCurrentSearchParams, setSearchParams } from '@helpers/url'
import useMutateUserPage from '@user-hooks/useMutateUserPage'

const getNextState = (page: UserPageDto, user: UserBaseDto): UserPageDto =>
  produce(page, (draft) => {
    draft.content.name = user.name
    draft.content.nickname = user.nickname
    draft.content.avatar = user.avatar
    draft.content.motto = user.motto
    draft.content.location = user.location
    draft.content.bio = user.bio
  })

const useForm = (user: UserBaseDto, onSuccess: () => void) => {
  const { locale } = useIntl()
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

      mutate({ id, data: { nickname, ...restData } })
    },
  })
}

export default useForm
