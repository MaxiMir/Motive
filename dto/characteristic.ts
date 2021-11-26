export type Characteristic = 'motivation' | 'creativity' | 'support' | 'completed' | 'abandoned' | 'members' | 'awards'

export type MainCharacteristic = Exclude<Characteristic, 'completed' | 'abandoned' | 'members' | 'awards'>

export type UserCharacteristic = Exclude<Characteristic, 'members'>

export type UserCharacteristics = {
  [k in UserCharacteristic]: number
}

export type GoalCharacteristic = Exclude<Characteristic, 'completed' | 'abandoned' | 'awards'>

export type GoalCharacteristics = {
  [k in GoalCharacteristic]: number
}

export type DayCharacteristics = {
  [k in GoalCharacteristic]: boolean
}
