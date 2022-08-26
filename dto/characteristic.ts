export enum MainCharacteristic {
  Motivation = 'motivation',
  Creativity = 'creativity',
  Support = 'support',
}

export const MAIN_CHARACTERISTICS = Object.values(MainCharacteristic)

export enum SecondCharacteristic {
  Completed = 'completed',
  Abandoned = 'abandoned',
  Followers = 'followers',
}

export const SECOND_CHARACTERISTICS = Object.values(SecondCharacteristic)

export type UserCharacteristic = MainCharacteristic | SecondCharacteristic

export type UserCharacteristicDto = Readonly<{
  [k in UserCharacteristic]: number
}>

export type GoalCharacteristicName = MainCharacteristic | 'members'

export type GoalCharacteristicDto = Readonly<{
  [k in GoalCharacteristicName]: number
}>

export const DAY_CHARACTERISTIC = ['motivation', 'creativity'] as const

export type DayCharacteristic = typeof DAY_CHARACTERISTIC[number]

export interface DayCharacteristicDto {
  readonly motivation: number
  readonly creativity: number
}

export interface DayCharacteristicUpdateDto {
  readonly id: number
  readonly dayId: number
  readonly name: DayCharacteristic
  readonly add: boolean
}
