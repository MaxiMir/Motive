import { UserBaseDto } from '@dto'
import { NotificationType } from './NotificationType'

interface NotificationBase {
  id: number
  created: string
  read: boolean
}

interface NotificationGoalDto extends NotificationBase {
  type:
    | NotificationType.NewGoal
    | NotificationType.AddMotivation
    | NotificationType.AddCreativity
    | NotificationType.NewQuestion
    | NotificationType.NewSupport
    | NotificationType.NewAnswer
    | NotificationType.NewFeedback
    | NotificationType.WebCoverage
  details: {
    id: number
    day: number
    name?: string
    user: UserBaseDto
  }
}

interface NotificationUserDto extends NotificationBase {
  type: NotificationType.NewFollower
  details: {
    name?: string
    user: UserBaseDto
  }
}

export type NotificationDto = NotificationGoalDto | NotificationUserDto
