export type MainCharacteristicName = 'motivation' | 'creativity' | 'support'

export type UserCharacteristicName = MainCharacteristicName | 'completed' | 'abandoned' | 'followers'

export type UserCharacteristicDto = {
  [k in UserCharacteristicName]: number
}

export type GoalCharacteristicName = MainCharacteristicName | 'members'

export type GoalCharacteristicDto = {
  [k in GoalCharacteristicName]: number
}

export type DayCharacteristicDto = {
  [k in MainCharacteristicName]: number[] | null
}
