import { UserBaseDto } from '../user'

const NOTIFICATIONS = [
  'new-goal',
  'new-follower',
  'added-points',
  'new-question',
  'new-support',
  'new-answer',
  'new-feedback',
  'web-coverage',
] as const

type NotificationType = (typeof NOTIFICATIONS)[number]

interface NotificationBase {
  readonly id: number
  readonly created: string
  readonly read: boolean
  readonly initiator: UserBaseDto
}

interface NotificationGoalDto extends NotificationBase {
  readonly type: NotificationType
  readonly details: {
    id: number
    day: number
    name?: string
  }
}

interface NotificationUserDto extends NotificationBase {
  readonly type: 'new-follower'
  readonly details: {
    name?: string
  }
}

export type NotificationDto = NotificationGoalDto | NotificationUserDto
