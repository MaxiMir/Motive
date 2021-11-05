import { UserCharacteristics } from './characteristic'
import { Goal } from './goal'
import { Role } from './role'

export interface UserBase {
  id: string
  firstName: string
  lastName: string
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
  id: string
  isAuthenticated: boolean
}
