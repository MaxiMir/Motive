import { useMutation, useQuery } from 'react-query'
import { GoalDto } from 'dto'
import DayService from 'services/DayService'
import { useChangeDayUrl, useMutateGoals } from 'views/UserView/hook'
import { getGoalNextState } from './helper'

export const useChangeDay = (goalId: number): [boolean, (dayId: number) => void] => {
  const [goals, mutateGoals] = useMutateGoals()
  const changeDayUrl = useChangeDayUrl()
  const { isLoading, mutate } = useMutation(DayService.getById, {
    onSuccess: (day) => {
      mutateGoals(getGoalNextState(goals, goalId, day))
      changeDayUrl(goals, goalId, day.id)
    },
  })

  return [isLoading, mutate]
}

export const useIncreaseViews = (goal: GoalDto, clientId?: number): void => {
  const { id } = goal.day

  useQuery(['views', id, clientId], () => DayService.incrementViews({ id }), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!clientId && clientId !== goal.owner.id,
  })
}
