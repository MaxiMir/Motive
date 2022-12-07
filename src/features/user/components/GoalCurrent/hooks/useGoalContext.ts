import { createContext, useContext } from 'react'
import { GoalDto } from '@dto'

const GoalContext = createContext<GoalDto | null>(null)

const useGoalContext = () => {
  return useContext(GoalContext) as GoalDto
}

export default useGoalContext
export { GoalContext }
