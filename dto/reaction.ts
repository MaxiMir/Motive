import { MainCharacteristic } from './characteristic'

export type ReactionsDto = Readonly<{
  [key in MainCharacteristic]: number[]
}>
