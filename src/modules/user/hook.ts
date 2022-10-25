import { useRouter } from 'next/router'
import { AxiosError } from 'axios'
import { useMutation, useQuery, useQueryClient, UseMutationResult, UseQueryResult } from 'react-query'
import { useIntl } from 'react-intl'
import { CreateMemberDto, GoalDto, MemberDto, UserDetailDto, UserPageDto } from 'src/common/dto'
import { PageService } from 'src/common/services/page'
import { MemberService } from 'src/common/services/member'
import { getQueryParams, getUserHref, setQueryParams, SearchParam, getImageUrl } from 'src/common/helpers/url'
import useClient from 'src/common/hooks/useClient'
import { getNextState } from './helper'

export const useUserPage = (): UseQueryResult<UserPageDto> => {
  const { key, path } = useUserPageConfig()

  return useQuery(key, () => PageService.getUser(path), {
    staleTime: 5_000,
  })
}

export const useUserPageConfig = (): { key: string; path: string } => {
  const { query, asPath } = useRouter()
  const id = Array.isArray(query.id) ? query.id[0] : query.id

  return {
    key: id || 'detail',
    path: asPath,
  }
}

interface UserMeta {
  title?: string
  description?: string
  keywords?: string
  url?: string
  type: string
  image?: string
}

export const useUserMeta = (user?: UserDetailDto): UserMeta | null => {
  const { formatMessage } = useIntl()

  if (!user) {
    return null
  }

  const partTitle = formatMessage({ id: 'page.user.title-profile' })
  const descriptionStart = formatMessage({ id: 'page.user.description-start' })
  const descriptionEnd = formatMessage({ id: 'page.user.description-end' })
  const goalNames = user.goals.map(({ name }) => `«${name}»`).join(', ')
  const image = !user.avatar ? undefined : getImageUrl(user.avatar)
  const userTag = `${user.name} (@${user.nickname})`

  return {
    title: `${userTag} • ${partTitle} ${process.env.NEXT_PUBLIC_APP_NAME}`,
    description: `${descriptionStart} ${userTag} ${descriptionEnd} ${goalNames}`,
    keywords: user.confirmations.map((c) => c.goal.name).join(', '),
    image,
    type: 'profile',
  }
}

export const useMutateUserPage = (): [UserPageDto, (page: UserPageDto) => void] => {
  const queryClient = useQueryClient()
  const { key } = useUserPageConfig()
  const state = queryClient.getQueryState<UserPageDto>(key)

  const mutate = (page: UserPageDto) => queryClient.setQueryData(key, page)

  return [state?.data as UserPageDto, mutate]
}

export const useMutateGoals = (): [GoalDto[], (goals: GoalDto[]) => void] => {
  const [page, mutatePage] = useMutateUserPage()

  const mutateGoals = (goals: GoalDto[]) => {
    mutatePage(getNextState(page, goals))
  }

  return [page.content.goals, mutateGoals]
}

export const useChangeDayUrl = (): ((goals: GoalDto[], goalId: number, dayId: number) => void) => {
  const { locale } = useIntl()
  const { asPath, pathname, push } = useRouter()

  return (goals: GoalDto[], goalId: number, dayId: number) => {
    const { [SearchParam.Dates]: _, ...restParams } = getQueryParams()
    const datesParam = goals.map(({ id, day }) => `${id}:${id !== goalId ? day.id : dayId}`).join(',')
    const as = setQueryParams(asPath, {
      [SearchParam.Dates]: datesParam,
      ...restParams,
    })

    push(pathname, as, { shallow: true, locale })
  }
}

export const useSendCreateMember = (): UseMutationResult<MemberDto, AxiosError, CreateMemberDto> => {
  const client = useClient()
  const { push } = useRouter()

  return useMutation(MemberService.create, {
    onSuccess({ goalId, dayId }) {
      if (!client) return

      const href = getUserHref(client.nickname)
      const params = { [SearchParam.Dates]: `${goalId}:${dayId}` }

      push(setQueryParams(href, params))
    },
  })
}
