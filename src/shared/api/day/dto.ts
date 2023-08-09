import { FeedbackDto } from '../feedback'
import { CreateTaskDto, TaskDto } from '../task'

export interface DayDto {
  readonly id: number
  readonly stage: number
  readonly date: string
  readonly tasks: TaskDto[]
  readonly topicCount: number
  readonly feedback: FeedbackDto | null
  readonly views: number
  readonly points: number
  readonly pointsRated: number
}

export interface CreateDayDto {
  readonly id: number
  readonly date: string
  readonly tasks: CreateTaskDto[]
}

export interface DayPointsUpdateDto {
  readonly id: number
  readonly dayId: number
  readonly add: boolean
}
