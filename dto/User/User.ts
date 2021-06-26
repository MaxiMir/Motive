import { Characteristic } from './Characteristic'

export interface User {
  id: string
  name: string
  href: string
  avatar: string
  characteristic: {
    [k in Characteristic]: number
  }
}
