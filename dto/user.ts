import { UserCharacteristic } from './characteristic'

export interface UserBase {
  id: number
  nickname: string
  name: string
  avatar: string
}

export interface User extends UserBase {
  characteristic: UserCharacteristic
}
