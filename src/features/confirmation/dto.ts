import { FeedbackDto, PhotoDto } from '@features/feedback'
import { GoalBaseDto } from '@features/goal'

export interface ConfirmationDto extends FeedbackDto {
  readonly id: number
  readonly started: string
  readonly end: string
  readonly goal: GoalBaseDto
  readonly inherited: boolean
  readonly photos: PhotoDto[]
}
