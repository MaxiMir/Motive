import { DayCharacteristicDto, GoalCharacteristicDto } from './characteristic'
import { UserBaseDto } from './user'
import { ReactionsDto } from './reaction'

export interface CreateGoalDto {
  readonly name: string
  readonly started: Date
  readonly hashtags: string
  readonly stages: string[]
  readonly date: Date
  readonly tasks: CreateTaskDto[]
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

export interface DayDto {
  readonly id: number
  readonly stage: number
  readonly date: string
  readonly characteristic: DayCharacteristicDto | null
  readonly tasks: TaskDto[]
  readonly topicCount: number
  readonly feedback: FeedbackDto | null
  readonly views: number
}

export interface CreateTaskDto {
  readonly name: string
  readonly date?: Date
}

export interface TaskDto {
  readonly id: number
  readonly name: string
  readonly date: string | null
  readonly completed: boolean
  readonly completedByOther: boolean
}

export interface FeedbackDto {
  readonly text: string | null
  readonly photos: PhotoDto[] | null
  readonly video: string | null
}

export interface ConfirmationDto extends FeedbackDto {
  readonly date: string
}

export interface PhotoDto {
  readonly src: string
  readonly width: number
  readonly height: number
}

export interface CalendarDto {
  readonly id: number
  readonly date: string
}
