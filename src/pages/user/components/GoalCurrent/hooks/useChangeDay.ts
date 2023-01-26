import { AxiosError } from 'axios'
import produce from 'immer'
import { useMutation, UseMutationResult } from 'react-query'
import { getDay } from '@entities/day'
import { useChangeDayUrl, useMutateGoals } from '@entities/user'
import { DayDto, GoalDto } from '@shared/api/dto'

const getGoalNextState = (goals: GoalDto[], goalId: number, day: DayDto): GoalDto[] =>
  produce(goals, (draft) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]
    draftGoal.day = day
  })

export const useChangeDay = (goalId: number): UseMutationResult<DayDto, AxiosError, number> => {
  const [goals, mutateGoals] = useMutateGoals()
  const changeDayUrl = useChangeDayUrl()

  return useMutation(getDay, {
    onSuccess: (day) => {
      mutateGoals(getGoalNextState(goals, goalId, day))
      changeDayUrl(goals, goalId, day.id)
    },
  })
}
