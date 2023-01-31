import { format } from 'date-fns'
import produce from 'immer'
import { useMutation } from 'react-query'
import { useChangeDayUrl, useGoalsCache } from 'entities/user'
import { GoalDto, CalendarDto, DayDto, getDay } from 'shared/api'

const getDayKey = (date: Date | string) => {
  return format(date instanceof Date ? date : new Date(date), 'yyyy-MM-dd')
}

const getDateMap = (calendar: CalendarDto[] | undefined, day: DayDto) => {
  if (!calendar) {
    return { [getDayKey(day.date)]: day.id }
  }

  return calendar.reduce((acc, c) => ({ ...acc, [getDayKey(c.date)]: c.id }), {})
}

const getGoalNextState = (goals: GoalDto[], goalId: number, day: DayDto): GoalDto[] =>
  produce(goals, (draft) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]
    draftGoal.day = day
  })

export const useSwitchDay = (goal: GoalDto) => {
  const { id, day, calendar } = goal
  const [goals, mutateGoals] = useGoalsCache()
  const changeDayUrl = useChangeDayUrl()
  const { isLoading, mutate } = useMutation(getDay, {
    onSuccess: (newDay) => {
      mutateGoals(getGoalNextState(goals, id, newDay))
      changeDayUrl(goals, id, newDay.id)
    },
  })
  const dateMap = getDateMap(calendar, day)
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
