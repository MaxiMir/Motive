import { UserCharacteristic } from './characteristic'

export interface UserBase {
  id: string
  name: string
  avatar: string
}

export interface User extends UserBase {
  characteristic: UserCharacteristic
}

export interface Client extends UserBase {
  isAuthenticated: boolean
}
