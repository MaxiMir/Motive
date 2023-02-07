import { UserBaseDto } from '../user'

export const enum NotificationType {
  NewGoal = 'new-goal',
  NewFollower = 'new-follower',
  AddMotivation = 'add-motivation',
  AddCreativity = 'add-creativity',
  NewQuestion = 'new-question',
  NewSupport = 'new-support',
  NewAnswer = 'new-answer',
  NewFeedback = 'new-feedback',
  WebCoverage = 'web-coverage',
}

interface NotificationBase {
  readonly id: number
  readonly created: string
  readonly read: boolean
}

interface NotificationGoalDto extends NotificationBase {
  readonly type:
    | NotificationType.NewGoal
    | NotificationType.AddMotivation
    | NotificationType.AddCreativity
    | NotificationType.NewQuestion
    | NotificationType.NewSupport
    | NotificationType.NewAnswer
    | NotificationType.NewFeedback
    | NotificationType.WebCoverage
  readonly details: {
    id: number
    day: number
    name?: string
    user: UserBaseDto
  }
}

interface NotificationUserDto extends NotificationBase {
  readonly type: NotificationType.NewFollower
  readonly details: {
    name?: string
    user: UserBaseDto
  }
}

export type NotificationDto = NotificationGoalDto | NotificationUserDto
