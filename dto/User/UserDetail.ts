import { User } from './User'
import { Goal } from './Goal'

export interface UserDetail extends User {
  isFavorite?: boolean
  views: number
  goals: Array<Goal>
}
