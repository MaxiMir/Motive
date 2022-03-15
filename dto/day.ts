import { DayCharacteristicDto } from './characteristic'
import { TaskDto } from './task'

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

export interface FeedbackDto {
  readonly text: string | null
  readonly photos: PhotoDto[] | null
  readonly video: string | null
}

export interface PhotoDto {
  readonly src: string
  readonly width: number
  readonly height: number
}
