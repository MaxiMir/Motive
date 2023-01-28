import { useFormik } from 'formik'
import produce from 'immer'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { useMutateUserPage, useUserContext } from 'entities/user'
import {
  UserPageDto,
  UpdateUserDto,
  UserBaseDto,
  getUsers,
  updateUser,
  userSchema,
} from 'shared/api'
import { getCurrentSearchParams, joinToHref, setSearchParams } from 'shared/lib/helpers'

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

export const useUpdateUser = (onSuccess: () => void) => {
  const { push } = useRouter()
  const user = useUserContext()
  const [page, mutatePage] = useMutateUserPage()
  const { formatMessage } = useIntl()
  const nicknameError = formatMessage({ id: 'page.user.modal-profile.nickname-error' })
  const { mutateAsync } = useMutation(({ id, data }: Options) => updateUser(id, data), {
    onSuccess(dto) {
      const href = joinToHref(dto.nickname)
      const as = setSearchParams(href, getCurrentSearchParams())
      mutatePage(getNextState(page, dto))
      push(as, as, { shallow: true }).then(onSuccess)
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
      links: user.links,
    },
    validationSchema: userSchema,
    async onSubmit(data, { setFieldError }) {
      const { id } = user
      const { nickname } = data
      const fetchParams = { where: { nickname }, page: 0, take: 1 }
      const usersDB = user.nickname === nickname ? null : await getUsers(fetchParams)

      if (usersDB?.length) {
        setFieldError('nickname', nicknameError)
        return
      }

      await mutateAsync({ id, data })
    },
  })
}
