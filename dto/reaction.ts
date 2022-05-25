import { DayCharacteristicName } from './characteristic'

export type ReactionsDto = Readonly<{
  [key in DayCharacteristicName]: number[]
}>
