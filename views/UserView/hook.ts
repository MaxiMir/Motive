import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { AxiosError } from 'axios'
import { useMutation, useQuery, useQueryClient, UseQueryResult } from 'react-query'
import { UseMutationResult } from 'react-query/types/react/types'
import { CreateMemberDto, GoalDto, MemberDto, UserPageDto } from 'dto'
import useLocale from 'hooks/useLocale'
import PageService from 'services/PageService'
import MemberService from 'services/MemberService'
import { scrollToElem } from 'helpers/dom'
import { getQueryParams, getUserUrn, setQueryParams, SEARCH_PARAMS } from 'helpers/url'
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

const getBlockId = (query: ParsedUrlQuery): string | null => {
  if (query[SEARCH_PARAMS.SCROLL_TO_DISCUSSION]) {
    return `discussion-${query[SEARCH_PARAMS.SCROLL_TO_DISCUSSION]}`
  }

  if (query[SEARCH_PARAMS.SCROLL_TO_GOAL]) {
    return `goal-${query[SEARCH_PARAMS.SCROLL_TO_GOAL]}`
  }

  return null
}

export const useScrollToBlock = (): void => {
  const { query } = useRouter()

  useEffect(() => {
    const blockId = getBlockId(query)

    blockId && scrollToElem(blockId)
  }, [query])
}

export const useChangeDayUrl = (): ((goals: GoalDto[], goalId: number, dayId: number) => void) => {
  const router = useRouter()
  const { locale } = useLocale()

  return (goals: GoalDto[], goalId: number, dayId: number) => {
    const { [SEARCH_PARAMS.DATES]: _, ...restParams } = getQueryParams()
    const datesParam = goals.map(({ id, day }) => `${id}:${id !== goalId ? day.id : dayId}`).join(',')
    const as = setQueryParams(router.asPath, {
      [SEARCH_PARAMS.DATES]: datesParam,
      ...restParams,
    })

    router.push(router.pathname, as, { shallow: true, locale })
  }
}

export const useSendCreateMember = (): UseMutationResult<MemberDto, AxiosError, CreateMemberDto> => {
  const client = useClient()
  const { jump } = useLocale()

  return useMutation(MemberService.create, {
    onSuccess({ goalId, dayId }) {
      if (!client) return

      const userUrn = getUserUrn(client.nickname)
      const params = { [SEARCH_PARAMS.DATES]: `${goalId}:${dayId}` }

      jump(setQueryParams(userUrn, params))
    },
  })
}
