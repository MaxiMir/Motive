export type MainCharacteristicName = 'motivation' | 'creativity' | 'support'

export type UserCharacteristicName = MainCharacteristicName | 'completed' | 'abandoned' | 'awards'

export type UserCharacteristic = {
  [k in UserCharacteristicName]: number
}

export type GoalCharacteristicName = MainCharacteristicName | 'members'

export type GoalCharacteristic = {
  [k in GoalCharacteristicName]: number
}

export type DayCharacteristic = {
  [k in MainCharacteristicName]: number[] | null
}
