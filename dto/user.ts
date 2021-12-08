import { UserCharacteristics } from './characteristic'

export interface UserBase {
  id: string
  name: string
  avatar: string
}

export interface User extends UserBase {
  characteristics: UserCharacteristics
}

export interface Client extends UserBase {
  isAuthenticated: boolean
}
