export type Characteristic = 'motivation' | 'creativity' | 'support' | 'completed' | 'abandoned'

export type UserCharacteristics = {
  [k in Characteristic]: number
}

export type GoalCharacteristic = Exclude<Characteristic, 'completed' | 'abandoned'>

export type GoalCharacteristics = {
  [k in GoalCharacteristic]: number
}
