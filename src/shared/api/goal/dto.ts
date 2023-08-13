import { FRONTEND_ID } from 'shared/config'
import { SphereDto } from '../characteristic'
import { DayDto } from '../day'
import { MemberDto } from '../member'
import { CreateTaskDto } from '../task'
import { UserBaseDto } from '../user'

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

export interface CreateGoalDto extends Pick<GoalBaseDto, 'name' | 'started'> {
  readonly hashtags: string
  readonly stages: ReadonlyArray<{ [FRONTEND_ID]: string; name: string }>
  readonly tasks: CreateTaskDto[]
}

export interface GoalDto extends GoalBaseDto {
  readonly day: DayDto
  readonly calendar: CalendarDto[]
  readonly completed: boolean
  readonly viewerPoints: number[]
  readonly member?: MemberDto
  readonly lastMembers: UserBaseDto[]
}

export interface CreatedGoal extends Omit<GoalDto, 'day'> {
  readonly days: DayDto[]
}

export interface CalendarDto {
  readonly id: number
  readonly date: string
}

export type UpdateStageDto = Pick<GoalBaseDto, 'id' | 'stage'>
