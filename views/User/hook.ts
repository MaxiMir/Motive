import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import produce from 'immer'
import { scrollToElem } from 'helpers/dom'
import { GoalDto, UserPageDto } from 'dto'
import { UserPageContext } from 'context/userPageContext'
import usePartialMutate, { PartialMutate } from 'hooks/usePartialMutate'

export const usePageInfo = (): { nickname: string; swrKey: string } => {
  const { query, asPath } = useRouter()

  return {
    nickname: asPath,
    swrKey: query.id as string,
  }
}

export const useMutatePage = (): [UserPageDto, PartialMutate] => {
  const { swrKey } = usePageInfo()
  const data = useContext(UserPageContext) as UserPageDto
  const partialMutate = usePartialMutate(swrKey)

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
