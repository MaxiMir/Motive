import { useContext } from 'react'
import { useRouter } from 'next/router'
import produce from 'immer'
import { Goal, UserPage } from 'dto'
import { UserPageContext } from 'context/userPageContext'
import usePartialMutate from 'hooks/usePartialMutate'

export default function useMutateGoals(): [Goal[], (goals: Goal[]) => void] {
  const { asPath } = useRouter()
  const data = useContext(UserPageContext) as UserPage
  const partialMutate = usePartialMutate(asPath) // use initial route

  const mutate = (goals: Goal[]) =>
    partialMutate(
      produce(data, (draft) => {
        draft.content.goals = goals
      }),
      false,
    )

  return [data.content.goals, mutate]
}
