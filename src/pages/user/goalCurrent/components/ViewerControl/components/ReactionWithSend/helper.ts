import { DAY_CHARACTERISTIC, DayCharacteristicName, GoalDto } from 'shared/api'

export const checkOnActive = (goal: GoalDto, name: DayCharacteristicName): boolean =>
  goal.reactions?.[name].some((d) => d === goal.day.id)

export const getCount = (goal: GoalDto, name: DayCharacteristicName): number | undefined => {
  if (!DAY_CHARACTERISTIC.includes(name)) {
    return undefined
  }

  return goal.day.characteristic?.[name] || 0
}
