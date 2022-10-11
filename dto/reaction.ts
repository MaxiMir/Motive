import { MainCharacteristicName } from './characteristic'

export type ReactionsDto = Readonly<{
  [key in MainCharacteristicName]: number[]
}>
