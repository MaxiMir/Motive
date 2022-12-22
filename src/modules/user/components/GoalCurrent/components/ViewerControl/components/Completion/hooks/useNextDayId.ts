import { useGoalContext } from '@modules/user/components/GoalCurrent/hooks'

export const useNextDayId = (): number | undefined => {
  const { day, calendar } = useGoalContext()
  const index = calendar.findIndex((c) => c.id === day.id)

  return calendar[index + 1]?.id
}