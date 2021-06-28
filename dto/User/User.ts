import { Characteristic } from './Characteristic'

export type Characteristics = {
  [k in Characteristic]: number
}

export interface User {
  id: string
  name: string
  href: string
  avatar: string
  characteristics: Characteristics
}
