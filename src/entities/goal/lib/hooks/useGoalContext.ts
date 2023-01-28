import { createContext, useContext } from 'react'
import { GoalDto } from 'shared/api'

export const GoalContext = createContext<GoalDto | null>(null)

export const useGoalContext = () => useContext(GoalContext) as GoalDto
