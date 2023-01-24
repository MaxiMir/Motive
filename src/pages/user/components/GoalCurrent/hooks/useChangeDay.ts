import produce from 'immer'
import { AxiosError } from 'axios'
import { useMutation, UseMutationResult } from 'react-query'
import { useChangeDayUrl, useMutateGoals } from '@pages/user/hooks'
import { GoalDto } from '@entities/goal'
import { DayDto, DayService } from '@entities/day'

const getGoalNextState = (goals: GoalDto[], goalId: number, day: DayDto): GoalDto[] =>
  produce(goals, (draft) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]
    draftGoal.day = day
  })

export const useChangeDay = (goalId: number): UseMutationResult<DayDto, AxiosError, number> => {
  const [goals, mutateGoals] = useMutateGoals()
  const changeDayUrl = useChangeDayUrl()

  return useMutation(DayService.getById, {
    onSuccess: (day) => {
      mutateGoals(getGoalNextState(goals, goalId, day))
      changeDayUrl(goals, goalId, day.id)
    },
  })
}
