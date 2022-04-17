import { useQuery } from 'react-query'
import { useSwipeable } from 'react-swipeable'
import { SwipeableHandlers } from 'react-swipeable/src/types'
import { clickOnElem } from 'helpers/dom'
import { GoalDto } from 'dto'
import DayService from 'services/DayService'

export const useIncreaseViews = (goal: GoalDto, clientId?: number): void => {
  const { id } = goal.day

  useQuery(['views', id, clientId], () => DayService.incrementViews(id), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!clientId && clientId !== goal.owner.id,
  })
}

export const useSwipeDay = (id: number): SwipeableHandlers => {
  return useSwipeable({
    onSwiped: (eventData) => {
      switch (eventData.dir) {
        case 'Left':
          clickOnElem(`next-${id}`)
          break
        case 'Right':
          clickOnElem(`prev-${id}`)
          break
      }
    },
  })
}
