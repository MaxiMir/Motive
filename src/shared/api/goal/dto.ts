import { SphereDto } from '../characteristic'
import { DayDto } from '../day'
import { MemberDto } from '../member'
import { CreateTaskDto } from '../task'
import { UserBaseDto } from '../user'

export interface CreateGoalDto {
  readonly name: string
  readonly started: string
  readonly hashtags: string
  readonly stages: ReadonlyArray<{ id: string; name: string }>
  readonly tasks: CreateTaskDto[]
}

export interface GoalBaseDto {
  readonly id: number
  readonly name: string
  readonly started: string
  readonly hashtags: string[]
  readonly stages: string[]
  readonly stage: number
  readonly owner: UserBaseDto
  readonly points: number
  readonly members: number
  readonly cover?: string
  readonly sphere: SphereDto
}

export interface GoalDto extends GoalBaseDto {
  readonly day: DayDto
  readonly calendar: CalendarDto[]
  readonly completed: boolean
  readonly member?: MemberDto
  readonly viewerPoints: number[]
  readonly lastMembers: UserBaseDto[]
}

export interface CreatedGoal extends Readonly<Omit<GoalDto, 'day'>> {
  readonly days: DayDto[]
}

export interface CalendarDto {
  readonly id: number
  readonly date: string
}

export interface UpdateStageDto {
  id: number
  stage: number
}
