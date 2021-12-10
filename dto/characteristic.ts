export type CharacteristicName =
  | 'motivation'
  | 'creativity'
  | 'support'
  | 'completed'
  | 'abandoned'
  | 'members'
  | 'awards'

export type MainCharacteristicName = Exclude<CharacteristicName, 'completed' | 'abandoned' | 'members' | 'awards'>

export type UserCharacteristicName = Exclude<CharacteristicName, 'members'>

export type UserCharacteristic = {
  [k in UserCharacteristicName]: number
}

export type GoalCharacteristicName = Exclude<CharacteristicName, 'completed' | 'abandoned' | 'awards'>

export type GoalCharacteristic = {
  [k in GoalCharacteristicName]: number
}

export type DayCharacteristic = {
  [k in GoalCharacteristicName]: boolean
}
