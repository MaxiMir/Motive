import { User } from './User'
import { Goal } from './Goal'
import { Role } from './Role'

export interface UserDetail extends User {
  isFavorite: boolean
  views: number
  goals: Array<Goal>
  role: Role
}
