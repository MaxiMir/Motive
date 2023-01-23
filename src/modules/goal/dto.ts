import { UserBaseDto } from '@modules/user'
import { DayDto } from '@modules/day'
import { CreateTaskDto } from '@modules/task'
import { MainCharacteristicName } from '@modules/characteristic'

export type GoalCharacteristicName = MainCharacteristicName | 'members'

export type GoalCharacteristicDto = Readonly<{
  [k in GoalCharacteristicName]: number
}>

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
  readonly owner: UserBaseDto
}

type ReactionsDto = Readonly<{
  [key in MainCharacteristicName]: number[]
}>

export interface GoalDto extends GoalBaseDto {
  readonly owner: UserBaseDto
  readonly day: DayDto
  readonly calendar: CalendarDto[]
  readonly reactions: ReactionsDto
  readonly inherited: boolean
  readonly completed: boolean
}

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
