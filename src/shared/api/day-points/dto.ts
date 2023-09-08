import { UserDto } from '../user'

export interface DayPoint {
  readonly id: number
  readonly date: string
  readonly user: UserDto
}
