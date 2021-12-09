export type Characteristic = 'motivation' | 'creativity' | 'support' | 'completed' | 'abandoned' | 'members' | 'awards'

export type MainCharacteristic = Exclude<Characteristic, 'completed' | 'abandoned' | 'members' | 'awards'>

export type UserCharacteristicName = Exclude<Characteristic, 'members'>

export type UserCharacteristic = {
  [k in UserCharacteristicName]: number
}

export type GoalCharacteristicName = Exclude<Characteristic, 'completed' | 'abandoned' | 'awards'>

export type GoalCharacteristic = {
  [k in GoalCharacteristicName]: number
}

export type DayCharacteristic = {
  [k in GoalCharacteristicName]: boolean
}
