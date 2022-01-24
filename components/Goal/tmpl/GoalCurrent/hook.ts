import produce from 'immer'
import { GoalDto } from 'dto'
import DayService from 'services/DayService'
import useSend from 'hooks/useSend'
import useChangeDayUrl from 'hooks/useChangeDayUrl'
import { useMutateGoals } from 'views/UserView/hook'

export default function useChangeDay(goalId: number): [boolean, (dayId: number) => void] {
  const [goals, mutateGoals] = useMutateGoals()
  const changeDayUrl = useChangeDayUrl()
  const { isLoading, send } = useSend(DayService.getById, {
    onSuccess: (day) => {
      mutateGoals(
        produce(goals, (draft: GoalDto[]) => {
          const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]
          draftGoal.days = [day]
        }),
      )
      changeDayUrl(goals, goalId, day.id)
    },
  })

  const onChangeDate = (dayId: number) => send(dayId)

  return [isLoading, onChangeDate]
}
