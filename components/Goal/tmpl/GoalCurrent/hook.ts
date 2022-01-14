import { useRouter } from 'next/router'
import produce from 'immer'
import { GoalDto } from 'dto'
import DayService from 'services/DayService'
import useSend from 'hooks/useSend'
import { useMutateGoals } from 'views/User/hook'
import { getUrn } from './helper'

export default function useChangeDay(goalId: number): [boolean, (dayId: number) => void] {
  const router = useRouter()
  const [goals, mutateGoals] = useMutateGoals()
  const { isLoading, send } = useSend(DayService.getById, {
    onSuccess: (day) => {
      mutateGoals(
        produce(goals, (draft: GoalDto[]) => {
          const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]
          draftGoal.days = [day]
        }),
      )
      router.push(router.pathname, getUrn(router.asPath, goals, goalId, day.id), { shallow: true })
    },
  })

  const onChangeDate = (dayId: number) => {
    send({ id: dayId })
  }

  return [isLoading, onChangeDate]
}
