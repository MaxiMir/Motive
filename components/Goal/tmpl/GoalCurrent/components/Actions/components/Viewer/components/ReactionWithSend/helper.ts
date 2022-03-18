import produce from 'immer'
import { DayCharacteristicName, DayCharacteristicUpdateDto, GoalDto, UserPageDto } from 'dto'

export type Context = { previous?: UserPageDto }

export const getNextState = (page: UserPageDto, options: DayCharacteristicUpdateDto): UserPageDto => {
  const { id, dayId, add, name } = options

  return produce(page, (draft) => {
    const draftGoals = draft.content.goals
    const draftGoal = draftGoals[draftGoals.findIndex((g) => g.id === id)]
    draftGoal.characteristic[name] += add ? 1 : -1
    draftGoal.reactions[name] = add
      ? [...draftGoal.reactions[name], dayId]
      : draftGoal.reactions[name].filter((r) => r !== dayId)
  })
}

export const checkOnActive = (name: DayCharacteristicName, goal: GoalDto): boolean =>
  goal.reactions?.[name].some((d) => d === goal.day.id) || false
