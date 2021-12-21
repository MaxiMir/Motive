import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import produce from 'immer'
import { scrollToElem } from 'helpers/dom'
import { Goal, UserPage } from 'dto'
import { UserPageContext } from 'context/userPageContext'
import usePartialMutate, { PartialMutate } from 'hooks/usePartialMutate'

export const useMutatePage = (): [UserPage, PartialMutate] => {
  const { asPath } = useRouter()
  const data = useContext(UserPageContext) as UserPage
  const partialMutate = usePartialMutate(asPath)

  return [data, partialMutate]
}

export const useMutateGoals = (): [Goal[], (goals: Goal[]) => void] => {
  const [page, mutate] = useMutatePage()

  const mutateGoals = (goals: Goal[]) =>
    mutate(
      produce(page, (draft) => {
        draft.content.user.goals = goals
      }),
      false,
    )

  return [page.content.user.goals, mutateGoals]
}

export const useScrollToGoal = (): void => {
  const { query } = useRouter()

  useEffect(() => {
    query.s && scrollToElem(`goal-${query.s}`)
  }, [query])
}
