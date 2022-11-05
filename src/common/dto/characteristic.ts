export enum MainCharacteristicName {
  Motivation = 'motivation',
  Creativity = 'creativity',
  Support = 'support',
}

export const MAIN_CHARACTERISTICS = Object.values(MainCharacteristicName)

export enum SecondCharacteristicName {
  Completed = 'completed',
  Abandoned = 'abandoned',
  Followers = 'followers',
  Following = 'following',
}

export const SECOND_CHARACTERISTICS = Object.values(SecondCharacteristicName)

export type UserCharacteristicName = MainCharacteristicName | SecondCharacteristicName

export type UserCharacteristicDto = Readonly<{
  [k in UserCharacteristicName]: number
}>

export type GoalCharacteristicName = MainCharacteristicName | 'members'

export type GoalCharacteristicDto = Readonly<{
  [k in GoalCharacteristicName]: number
}>

export const DAY_CHARACTERISTIC = ['motivation', 'creativity'] as const

export type DayCharacteristicName = typeof DAY_CHARACTERISTIC[number]

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
