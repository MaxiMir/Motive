import { createContext, useContext } from 'react'
import { GoalDto } from '@modules/goal'

export const GoalContext = createContext<GoalDto | null>(null)

export const useGoalContext = () => useContext(GoalContext) as GoalDto
