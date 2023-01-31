import { MainCharacteristicName } from '../characteristic'
import { DayDto } from '../day'
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
  readonly characteristic: Readonly<{ [k in GoalCharacteristicName]: number }>
  readonly owner: UserBaseDto
}

export type GoalCharacteristicName = MainCharacteristicName | 'members'

export interface GoalDto extends GoalBaseDto {
  readonly day: DayDto
  readonly calendar: CalendarDto[]
  readonly reactions: Readonly<{ [key in MainCharacteristicName]: number[] }>
  readonly inherited: boolean
  readonly completed: boolean
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
