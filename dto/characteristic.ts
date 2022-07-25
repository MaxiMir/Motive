export type MainCharacteristicName = 'motivation' | 'creativity' | 'support'

export type UserCharacteristicName = MainCharacteristicName | 'completed' | 'abandoned' | 'followers'

export type UserCharacteristicDto = Readonly<{
  [k in UserCharacteristicName]: number
}>

export type GoalCharacteristicName = MainCharacteristicName | 'members'

export type GoalCharacteristicDto = Readonly<{
  [k in GoalCharacteristicName]: number
}>

export type DayCharacteristicName = 'motivation' | 'creativity'

export interface DayCharacteristicDto {
  readonly motivation: number
  readonly creativity: number
}

export interface DayCharacteristicUpdateDto {
  readonly id: number
  readonly dayId: number
  readonly name: DayCharacteristicName
  readonly add: boolean
}
