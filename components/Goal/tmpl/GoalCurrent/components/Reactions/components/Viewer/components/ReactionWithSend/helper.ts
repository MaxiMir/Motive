import { DayCharacteristicName, GoalDto } from 'dto'

export const checkOnActive = (name: DayCharacteristicName, goal: GoalDto): boolean =>
  goal.reactions?.[name].some((d) => d === goal.day.id) || false
