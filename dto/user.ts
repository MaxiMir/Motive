import { UserCharacteristics } from './characteristic'
import { Goal } from './goal'
import { Role } from './role'

export interface UserBase {
  id: string
  fullName: string
  href: string
  avatar: string
}

export interface User extends UserBase {
  characteristics: UserCharacteristics
}

export interface UserDetail extends User {
  views: number
  favorite: boolean
  role: Role
  goals: Goal[]
}

export interface Client {
  id: string // TODO REMOVE!
  user: UserBase | null
  isAuthenticated: boolean
}
