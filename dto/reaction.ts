import { DayCharacteristicName } from './characteristic'

export type ReactionsDto = {
  [key in DayCharacteristicName]: number[]
}
