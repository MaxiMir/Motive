import { createContext, useContext } from 'react'
import { GoalDto } from '@dto'

export const GoalContext = createContext<GoalDto | null>(null)

export const useGoalContext = () => useContext(GoalContext) as GoalDto
