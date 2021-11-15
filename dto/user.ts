import { UserCharacteristics } from './characteristic'

export interface UserBase {
  id: string
  fullName: string
  href: string
  avatar: string
}

export interface User extends UserBase {
  characteristics: UserCharacteristics
}

export interface Client {
  id: string // TODO REMOVE!
  user: UserBase | null
  isAuthenticated: boolean
}
