import produce from 'immer'
import {
  DAY_CHARACTERISTIC,
  DayCharacteristicName,
  DayCharacteristicUpdateDto,
  GoalDto,
  UserPageDto,
} from 'src/common/dto'

export interface Context {
  previous?: UserPageDto
}

export const checkOnActive = (goal: GoalDto, name: DayCharacteristicName): boolean =>
  !!goal.reactions?.[name].some((d) => d === goal.day.id)

export const getCount = (goal: GoalDto, name: DayCharacteristicName): number | undefined => {
  if (!DAY_CHARACTERISTIC.includes(name)) {
    return undefined
  }

  return goal.day.characteristic?.[name] || 0
}

export const getNextState = (page: UserPageDto, options: DayCharacteristicUpdateDto): UserPageDto => {
  const { id, dayId, add, name } = options

  return produce(page, (draft) => {
    const draftGoals = draft.content.goals
    const draftGoal = draftGoals[draftGoals.findIndex((g) => g.id === id)]
    draftGoal.characteristic[name] += add ? 1 : -1

    if (!draftGoal.day.characteristic) {
      draftGoal.day.characteristic = { motivation: 0, creativity: 0 }
    }

    draftGoal.day.characteristic[name] += add ? 1 : -1
    draftGoal.reactions[name] = add
      ? [...draftGoal.reactions[name], dayId]
      : draftGoal.reactions[name].filter((r) => r !== dayId)
  })
}
