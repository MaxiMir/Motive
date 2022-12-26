import produce from 'immer'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useMutateUserPage, useUserContext } from '@modules/user/hooks'
import { UserPageDto } from '@features/page'
import { UpdateUserDto, UserBaseDto, UserService, getUserHref, profileSchema } from '@features/user'
import { getCurrentSearchParams, setSearchParams } from '@helpers/url'

const getNextState = (page: UserPageDto, user: UserBaseDto) =>
  produce(page, (draft) => {
    draft.name = user.name
    draft.nickname = user.nickname
    draft.avatar = user.avatar
    draft.motto = user.motto
    draft.location = user.location
    draft.bio = user.bio
  })

interface Options {
  id: number
  data: UpdateUserDto
}

export const useForm = (onSuccess: () => void) => {
  const router = useRouter()
  const user = useUserContext()
  const [page, mutatePage] = useMutateUserPage()
  const { formatMessage } = useIntl()
  const nicknameError = formatMessage({ id: 'page.user.modal-profile.nickname-error' })
  const { mutateAsync } = useMutation(({ id, data }: Options) => UserService.update(id, data), {
    onSuccess(dto) {
      const href = getUserHref(dto.nickname)
      const as = setSearchParams(href, getCurrentSearchParams())
      mutatePage(getNextState(page, dto))
      router.push(as, as, { shallow: true }).then(onSuccess)
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
      const { nickname } = data
      const fetchParams = { where: { nickname }, page: 0, take: 1 }
      const usersDB = user.nickname === nickname ? null : await UserService.get(fetchParams)

      if (usersDB?.length) {
        setFieldError('nickname', nicknameError)
        return
      }

      await mutateAsync({ id, data })
    },
  })
}
