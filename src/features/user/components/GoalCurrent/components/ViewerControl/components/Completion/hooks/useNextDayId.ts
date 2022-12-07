import useGoalContext from '@features/user/components/GoalCurrent/hooks/useGoalContext'

const useNextDayId = (): number | undefined => {
  const { day, calendar } = useGoalContext()
  const index = calendar.findIndex((c) => c.id === day.id)

  return calendar[index + 1]?.id
}

export default useNextDayId
