import { useContext } from 'react'
import produce from 'immer'
import { Goal, UserPage } from 'dto'
import { UserPageContext } from 'pages/better/[id]'
import usePartialMutate from 'hooks/usePartialMutate'

export default function useMutateGoals(): [Goal[], (goals: Goal[]) => void] {
  const data = useContext(UserPageContext) as UserPage
  const partialMutate = usePartialMutate(data.href)

  const mutate = (goals: Goal[]) =>
    partialMutate(
      produce(data, (draft) => {
        draft.user.goals = goals
      }),
      false,
    )

  return [data.user.goals, mutate]
}
