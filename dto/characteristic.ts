export type MainCharacteristicName = 'motivation' | 'creativity' | 'support'

export type UserCharacteristicName = MainCharacteristicName | 'completed' | 'abandoned' | 'followers'

export type UserCharacteristicDto = {
  [k in UserCharacteristicName]: number
}

export type GoalCharacteristicName = MainCharacteristicName | 'members'

export type GoalCharacteristicDto = {
  [k in GoalCharacteristicName]: number
}

export type DayCharacteristicName = 'motivation' | 'creativity'

export interface DayCharacteristicDto {
  motivation: number
  creativity: number
}

export interface DayCharacteristicUpdate {
  id: number
  dayId: number
  name: string
  add: boolean
}
