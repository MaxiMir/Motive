import { GoalCharacteristicDto } from './characteristic'
import { UserBaseDto } from './user'
import { ReactionsDto } from './reaction'
import { CreateTaskDto } from './task'
import { DayDto, FeedbackDto } from './day'

export interface CreateGoalDto {
  readonly name: string
  readonly started: Date
  readonly hashtags: string
  readonly stages: string[]
  readonly tasks: CreateTaskDto[]
  readonly tasksDate: Date
}

export interface GoalBaseDto {
  readonly id: number
  readonly name: string
  readonly started: string
  readonly hashtags: string[]
  readonly stages: string[]
  readonly stage: number
  readonly characteristic: GoalCharacteristicDto
  readonly owner: UserBaseDto
}

export interface GoalDto extends GoalBaseDto {
  readonly owner: UserBaseDto
  readonly day: DayDto
  readonly calendar: CalendarDto[]
  readonly reactions: ReactionsDto
  readonly inherited: boolean
  readonly completed: boolean
}

export type CreatedGoal = Readonly<Omit<GoalDto, 'day'> & { days: DayDto[] }>

export interface GoalStageDto {
  readonly id: number
  readonly stage: number
}

export interface CreateDayDto {
  readonly id: number
  readonly date: Date
  readonly tasks: CreateTaskDto[]
}

export interface ConfirmationDto extends FeedbackDto {
  readonly id: number
  readonly started: string
  readonly end: string
  readonly goal: GoalBaseDto
  readonly inherited: boolean
}

export interface CalendarDto {
  readonly id: number
  readonly date: string
}
