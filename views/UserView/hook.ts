import { useRouter } from 'next/router'
import { AxiosError } from 'axios'
import { useMutation, useQuery, useQueryClient, UseQueryResult } from 'react-query'
import { UseMutationResult } from 'react-query/types/react/types'
import { CreateMemberDto, GoalDto, MemberDto, UserPageDto } from 'dto'
import useLocale from 'hooks/useLocale'
import PageService from 'services/PageService'
import MemberService from 'services/MemberService'
import { getQueryParams, getUserHref, setQueryParams, SearchParam } from 'helpers/url'
import useClient from 'hooks/useClient'
import { getNextState } from './helper'

export const useUserPage = (): UseQueryResult<UserPageDto> => {
  const { key, urn } = useUserPageConfig()

  return useQuery(key, () => PageService.getUser(urn), {
    staleTime: 5_000,
  })
}

export const useUserPageConfig = (): { key: string; urn: string } => {
  const { query, asPath } = useRouter()
  const id = Array.isArray(query.id) ? query.id[0] : query.id

  return {
    key: id || 'detail',
    urn: asPath,
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
  const router = useRouter()
  const { locale } = useLocale()

  return (goals: GoalDto[], goalId: number, dayId: number) => {
    const { [SearchParam.Dates]: _, ...restParams } = getQueryParams()
    const datesParam = goals.map(({ id, day }) => `${id}:${id !== goalId ? day.id : dayId}`).join(',')
    const as = setQueryParams(router.asPath, {
      [SearchParam.Dates]: datesParam,
      ...restParams,
    })

    router.push(router.pathname, as, { shallow: true, locale })
  }
}

export const useSendCreateMember = (): UseMutationResult<MemberDto, AxiosError, CreateMemberDto> => {
  const client = useClient()
  const { go } = useLocale()

  return useMutation(MemberService.create, {
    onSuccess({ goalId, dayId }) {
      if (!client) return

      const href = getUserHref(client.nickname)
      const params = { [SearchParam.Dates]: `${goalId}:${dayId}` }

      go(setQueryParams(href, params))
    },
  })
}
