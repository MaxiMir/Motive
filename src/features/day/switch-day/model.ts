import { produce } from 'immer'
import { useMutation } from 'react-query'
import { useChangeDayUrl, useGoalsCache } from 'entities/user'
import { GoalDto, DayDto, getDay, getMemberDay } from 'shared/api'
import { getDateMap, getDayKey } from './lib'

export function useSwitchDay(goal: GoalDto) {
  const { id, day, calendar, member } = goal
  const [goals, mutateGoals] = useGoalsCache()
  const changeDayUrl = useChangeDayUrl()
  const { isLoading, mutate } = useMutation(
    (dayId: number) => (!member ? getDay(dayId) : getMemberDay(member.id, dayId)),
    {
      onSuccess: (newDay) => {
        mutateGoals(getNextState(goals, id, newDay))
        changeDayUrl(goals, id, newDay.id)
      },
    },
  )
  const dateMap = getDateMap(calendar)
  const dates = Object.keys(dateMap)
  const dayKey = getDayKey(day.date)
  const dayIndex = dates.findIndex((d) => d === dayKey)
  const prev = dates[dayIndex - 1]
  const next = dates[dayIndex + 1]

  const onChangeDate = (value: Date | string | null) => {
    if (!value) return

    const valueKey = getDayKey(value)

    mutate(dateMap[valueKey])
  }

  const shouldDisableDate = (value: Date) => {
    const valueKey = getDayKey(value)

    return !dates.includes(valueKey)
  }

  return {
    isLoading,
    prev,
    next,
    onChangeDate,
    shouldDisableDate,
  }
}

function getNextState(goals: GoalDto[], goalId: number, day: DayDto): GoalDto[] {
  return produce(goals, (draft) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]
    draftGoal.day = day
  })
}
