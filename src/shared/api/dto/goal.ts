import { GoalCharacteristicDto, MainCharacteristicName } from './characteristic'
import { DayDto } from './day'
import { CreateTaskDto } from './task'

export interface CreateGoalDto {
  readonly name: string
  readonly started: string
  readonly hashtags: string
  readonly stages: CreateStageDto[]
  readonly tasks: CreateTaskDto[]
}

export interface CreateStageDto {
  readonly id: string
  readonly name: string
}

export interface GoalBaseDto {
  readonly id: number
  readonly name: string
  readonly started: string
  readonly hashtags: string[]
  readonly stages: string[]
  readonly stage: number
  readonly characteristic: GoalCharacteristicDto
  readonly owner: Owner
}

interface Owner {
  readonly id: number
  readonly name: string
  readonly nickname: string
  readonly avatar?: string | null
}

export interface GoalDto extends GoalBaseDto {
  readonly day: DayDto
  readonly calendar: CalendarDto[]
  readonly reactions: ReactionsDto
  readonly inherited: boolean
  readonly completed: boolean
}

type ReactionsDto = Readonly<{
  [key in MainCharacteristicName]: number[]
}>

export interface CreatedGoal extends Readonly<Omit<GoalDto, 'day'>> {
  readonly days: DayDto[]
}

export interface GoalStageDto {
  readonly id: number
  readonly stage: number
}

export interface CalendarDto {
  readonly id: number
  readonly date: string
}
