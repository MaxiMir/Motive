import { useMutation } from 'react-query'
import { GoalDto } from '@dto'
import useClient from '@hooks/useClient'
import DayService from '@services/day'

const useIncreaseViews = (goal: GoalDto) => {
  const { id } = goal.day
  const client = useClient()
  const enabled = client && client?.id !== goal.owner.id

  return useMutation(() => (!enabled ? Promise.resolve() : DayService.incrementViews(id)))
}

export default useIncreaseViews
