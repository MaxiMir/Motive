import produce from 'immer'
import { AxiosError } from 'axios'
import { useMutation, UseMutationResult } from 'react-query'
import { DayDto, GoalDto } from '@dto'
import DayService from '@services/day'
import useChangeDayUrl from '@user-hooks/useChangeDayUrl'
import useMutateGoals from '@user-hooks/useMutateGoals'

const getGoalNextState = (goals: GoalDto[], goalId: number, day: DayDto): GoalDto[] =>
  produce(goals, (draft) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]
    draftGoal.day = day
  })

const useChangeDay = (goalId: number): UseMutationResult<DayDto, AxiosError, number> => {
  const [goals, mutateGoals] = useMutateGoals()
  const changeDayUrl = useChangeDayUrl()

  return useMutation(DayService.getById, {
    onSuccess: (day) => {
      mutateGoals(getGoalNextState(goals, goalId, day))
      changeDayUrl(goals, goalId, day.id)
    },
  })
}

export default useChangeDay
