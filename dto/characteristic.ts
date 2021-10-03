export type Characteristic = 'motivation' | 'creativity' | 'support' | 'completed' | 'abandoned' | 'members'

export type MainCharacteristic = Exclude<Characteristic, 'completed' | 'abandoned' | 'members'>

export type UserCharacteristic = Exclude<Characteristic, 'members'>

export type UserCharacteristics = {
  [k in UserCharacteristic]: number
}

export type GoalCharacteristic = Exclude<Characteristic, 'completed' | 'abandoned'>

export type GoalCharacteristicValue = {
  users: string[]
  countAll: number
}

export type GoalCharacteristics = {
  [k in GoalCharacteristic]: GoalCharacteristicValue
}
