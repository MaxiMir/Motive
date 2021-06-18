import { Characteristic } from './Characteristic'

export interface User {
  id: string
  name: string
  link: string
  avatar: string
  characteristic: Characteristic
}
