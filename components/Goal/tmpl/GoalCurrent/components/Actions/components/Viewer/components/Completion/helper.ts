import { GoalDto } from 'dto'

export const getNextDayId = (goal: GoalDto): number | undefined => {
  const { day, calendar } = goal
  const index = calendar.findIndex((c) => c.id === day.id)

  return calendar[index + 1]?.id
}
