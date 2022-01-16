import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import produce from 'immer'
import { scrollToElem } from 'helpers/dom'
import { GoalDto, UserPageDto } from 'dto'
import { UserPageContext } from 'context/userPageContext'
import usePartialMutate, { PartialMutate } from 'hooks/usePartialMutate'

export const usePageSWRConfig = (): { key: string; urn: string } => {
  const router = useRouter()

  return {
    key: router.query.id as string,
    urn: router.asPath,
  }
}

export const useMutatePage = (): [UserPageDto, PartialMutate] => {
  const { key } = usePageSWRConfig()
  const data = useContext(UserPageContext) as UserPageDto
  const partialMutate = usePartialMutate(key)

  return [data, partialMutate]
}

export const useMutateGoals = (): [GoalDto[], (goals: GoalDto[]) => void] => {
  const [page, mutate] = useMutatePage()

  const mutateGoals = (goals: GoalDto[]) =>
    mutate(
      produce(page, (draft) => {
        draft.content.goals = goals
      }),
      false,
    )

  return [page.content.goals, mutateGoals]
}

export const useScrollToGoal = (): void => {
  const { query } = useRouter()

  useEffect(() => {
    query.s && scrollToElem(`goal-${query.s}`)
  }, [query])
}
