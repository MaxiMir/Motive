import produce from 'immer'
import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useFormik } from 'formik'
import { mixed, object, string } from 'yup'
import { getCurrentSearchParams, setSearchParams } from '@lib/helpers/url'
import { useMutateUserPage, useUserContext } from '@pages/user/hooks'
import {
  UserPageDto,
  UpdateUserDto,
  UserBaseDto,
  toHref,
  getUsers,
  updateUser,
} from '@entities/user'

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
      const href = toHref(dto.nickname)
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
    validationSchema: object({
      name: string()
        .trim()
        .required('The name is needed')
        .min(3, "It's too short.")
        .max(100, "It's so long."),
      nickname: string()
        .trim()
        .required('A nickname is needed')
        .min(3, "It's too short.")
        .max(255, "It's so long.")
        .matches(/^[a-z0-9\-_]+$/, 'Only lowercase letters, numbers and "-" and "_"'),
      avatar: mixed().required('An avatar is needed'),
      motto: string().trim().max(140, "It's so long."),
      location: string().trim().min(3, "It's too short.").max(64, "It's so long."),
      bio: string().trim().max(320, "It's so long."),
    }),
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
