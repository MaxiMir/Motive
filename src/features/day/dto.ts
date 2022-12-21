import { CreateTaskDto, TaskDto } from '@features/task'
import { FeedbackDto } from '@features/feedback'

interface DayCharacteristicDto {
  readonly motivation: number
  readonly creativity: number
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

export interface CreateDayDto {
  readonly id: number
  readonly date: string
  readonly tasks: CreateTaskDto[]
}

export const DAY_CHARACTERISTIC = ['motivation', 'creativity'] as const

export type DayCharacteristicName = typeof DAY_CHARACTERISTIC[number]

export interface DayCharacteristicUpdateDto {
  readonly id: number
  readonly dayId: number
  readonly name: DayCharacteristicName
  readonly add: boolean
}
