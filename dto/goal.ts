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

export interface GoalDto {
  readonly id: number
  readonly name: string
  readonly started: string
  readonly hashtags: string[]
  readonly stages: string[]
  readonly stage: number
  readonly owner: UserBaseDto
  readonly characteristic: GoalCharacteristicDto
  readonly day: DayDto
  readonly calendar: CalendarDto[]
  readonly reactions: ReactionsDto
  readonly inherited: boolean
}

export interface GoalCompletedDto extends GoalDto {
  readonly confirmation: ConfirmationDto
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
  readonly date: string
}

export interface CalendarDto {
  readonly id: number
  readonly date: string
}
