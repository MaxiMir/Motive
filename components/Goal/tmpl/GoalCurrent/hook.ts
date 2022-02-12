import produce from 'immer'
import { useMutation } from 'react-query'
import { GoalDto } from 'dto'
import DayService from 'services/DayService'
import useChangeDayUrl from 'hooks/useChangeDayUrl'
import { useMutateGoals } from 'views/UserView/hook'

export default function useChangeDay(goalID: number): [boolean, (dayID: number) => void] {
  const [goals, mutateGoals] = useMutateGoals()
  const changeDayUrl = useChangeDayUrl()
  const { isLoading, mutate } = useMutation(DayService.getById, {
    onSuccess: (day) => {
      mutateGoals(
        produce(goals, (draft: GoalDto[]) => {
          const draftGoal = draft[draft.findIndex((g) => g.id === goalID)]
          draftGoal.day = day
        }),
      )
      changeDayUrl(goals, goalID, day.id)
    },
  })

  return [isLoading, mutate]
}
