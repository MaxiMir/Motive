import { FeedbackDto, PhotoDto } from '@entities/feedback'
import { GoalBaseDto } from '@entities/goal'

export interface ConfirmationDto extends FeedbackDto {
  readonly id: number
  readonly started: string
  readonly end: string
  readonly goal: GoalBaseDto
  readonly inherited: boolean
  readonly photos: PhotoDto[]
}
