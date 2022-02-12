import produce from 'immer'
import { DayCharacteristicName, DayCharacteristicUpdate, GoalDto, UserPageDto } from 'dto'

export type Context = { previous?: UserPageDto }

export const getNextState = (previous: UserPageDto, options: DayCharacteristicUpdate): UserPageDto => {
  const { id, dayID, add, name } = options

  return produce(previous, (draft) => {
    const draftGoals = draft.content.goals
    const draftGoal = draftGoals[draftGoals.findIndex((g) => g.id === id)]
    draftGoal.characteristic[name] += add ? 1 : -1
    draftGoal.reactions[name] = add
      ? [...draftGoal.reactions[name], dayID]
      : draftGoal.reactions[name].filter((r) => r !== dayID)
  })
}

export const checkOnActive = (name: DayCharacteristicName, goal: GoalDto): boolean =>
  goal.reactions?.[name].some((d) => d === goal.day.id) || false
