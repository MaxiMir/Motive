import { UserBaseDto } from './user'

export enum NOTIFICATION_TYPE {
  NEW_GOAL = 'new-goal',
  NEW_FOLLOWER = 'new-follower',
  ADD_MOTIVATION = 'add-motivation',
  ADD_CREATIVITY = 'add-creativity',
  NEW_QUESTION = 'new-question',
  NEW_SUPPORT = 'new-support',
  NEW_ANSWER = 'new-answer',
  NEW_FEEDBACK = 'new-feedback',
  WEB_COVERAGE = 'web-coverage',
}

interface NotificationBase {
  id: number
  created: string
  read: boolean
}

export interface NotificationGoalDto extends NotificationBase {
  type:
    | NOTIFICATION_TYPE.NEW_GOAL
    | NOTIFICATION_TYPE.ADD_MOTIVATION
    | NOTIFICATION_TYPE.ADD_CREATIVITY
    | NOTIFICATION_TYPE.NEW_QUESTION
    | NOTIFICATION_TYPE.NEW_SUPPORT
    | NOTIFICATION_TYPE.NEW_ANSWER
    | NOTIFICATION_TYPE.NEW_FEEDBACK
    | NOTIFICATION_TYPE.WEB_COVERAGE
  details: {
    id: number
    day: number
    name?: string
    user: UserBaseDto
  }
}

export interface NotificationUserDto extends NotificationBase {
  type: NOTIFICATION_TYPE.NEW_FOLLOWER
  details: {
    name?: string
    user: UserBaseDto
  }
}

export type NotificationDto = NotificationGoalDto | NotificationUserDto
