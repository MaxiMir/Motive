import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery, useQueryClient, UseQueryResult } from 'react-query'
import produce from 'immer'
import { scrollToElem } from 'helpers/dom'
import { GoalDto, UserPageDto } from 'dto'
import PageService from 'services/PageService'

export const useUserPage = (): UseQueryResult<UserPageDto> => {
  const { key, urn } = usePageSWRConfig()

  return useQuery(key, () => PageService.getUser(urn), {
    staleTime: 30_000,
  })
}

export const usePageSWRConfig = (): { key: string; urn: string } => {
  const router = useRouter()

  return {
    key: router.query.id as string,
    urn: router.asPath,
  }
}

export const useMutatePage = (): [UserPageDto, (page: UserPageDto) => void] => {
  const queryClient = useQueryClient()
  const { key } = usePageSWRConfig()
  const state = queryClient.getQueryState<UserPageDto>(key)

  const mutate = (page: UserPageDto) => queryClient.setQueryData(key, page)

  return [state?.data as UserPageDto, mutate]
}

export const useMutateGoals = (): [GoalDto[], (goals: GoalDto[]) => void] => {
  const [page, mutate] = useMutatePage()

  const mutateGoals = (goals: GoalDto[]) =>
    mutate(
      produce(page, (draft) => {
        draft.content.goals = goals
      }),
    )

  return [page.content.goals, mutateGoals]
}

export const useScrollToGoal = (): void => {
  const { query } = useRouter()

  useEffect(() => {
    query.s && scrollToElem(`goal-${query.s}`)
  }, [query])
}
