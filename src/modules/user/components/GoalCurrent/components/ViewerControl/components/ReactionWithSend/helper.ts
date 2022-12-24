import { GoalDto } from '@features/goal'
import { DAY_CHARACTERISTIC, DayCharacteristicName } from '@features/day'

type CheckOnActive = (goal: GoalDto, name: DayCharacteristicName) => boolean
type GetCount = (goal: GoalDto, name: DayCharacteristicName) => number | undefined

export const checkOnActive: CheckOnActive = (goal, name) =>
  !!goal.reactions?.[name].some((d) => d === goal.day.id)

export const getCount: GetCount = (goal, name) => {
  if (!DAY_CHARACTERISTIC.includes(name)) {
    return undefined
  }

  return goal.day.characteristic?.[name] || 0
}
