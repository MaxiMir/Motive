import { UserCharacteristics } from './characteristic'

export interface UserBase {
  name: string
  nickname: string // uniq
  href: string
  avatar: string
}

export interface User extends UserBase {
  characteristics: UserCharacteristics
}

export interface Client extends UserBase {
  isAuthenticated: boolean
}
