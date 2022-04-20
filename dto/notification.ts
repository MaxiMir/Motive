import { UserBaseDto } from './user'

export enum NOTIFICATION_TYPE {
  NEW_GOAL = 'new-goal',
  NEW_FOLLOWER = 'new-follower',
  ADD_MOTIVATION = 'add-motivation',
  ADD_CREATIVITY = 'add-creativity',
  NEW_QUESTION = 'new-question',
  NEW_SUPPORT = 'new-support',
  NEW_ANSWER = 'new-answer',
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
  details: {
    id: number
    day: number
    user: UserBaseDto
  }
}

export interface NotificationUserDto extends NotificationBase {
  type: NOTIFICATION_TYPE.NEW_FOLLOWER
  details: {
    user: UserBaseDto
  }
}

export type NotificationDto = NotificationGoalDto | NotificationUserDto
