import { useFormik } from 'formik'
import { produce } from 'immer'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { useUserPageCache } from 'entities/user'
import { UserPageDto, UpdateUserDto, getUsers, updateUser } from 'shared/api'
import { getCurrentSearchParams, joinToHref, setSearchParams } from 'shared/lib/helpers'
import { UserSchema } from './schema'

interface Options {
  id: number
  dto: UpdateUserDto
}

export function useEditProfileForm(user: UserPageDto, onSuccess: () => void) {
  const { push } = useRouter()
  const { formatMessage } = useIntl()
  const [page, mutatePage] = useUserPageCache()
  const nicknameError = formatMessage({ id: 'page.user.modal-profile.nickname-error' })
  const { mutateAsync } = useMutation(({ id, dto }: Options) => updateUser(id, dto), {
    onSuccess(res) {
      const href = joinToHref(res.nickname)
      const as = setSearchParams(href, getCurrentSearchParams())
      const nextState = produce(page, (draft) => {
        draft.name = res.name
        draft.nickname = res.nickname
        draft.avatar = res.avatar
        draft.motto = res.motto
        draft.location = res.location
        draft.bio = res.bio
      })
      mutatePage(nextState)
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
    validationSchema: UserSchema,
    async onSubmit(dto, { setFieldError }) {
      const { id } = user
      const { nickname } = dto
      const fetchParams = { where: { nickname }, page: 0, take: 1 }
      const usersDB = user.nickname === nickname ? null : await getUsers(fetchParams)

      if (usersDB?.length) {
        setFieldError('nickname', nicknameError)
        return
      }

      await mutateAsync({ id, dto })
    },
  })
}
