import { UserBaseDto } from './user'

interface NotificationBase {
  id: number
  created: string
  read: boolean
}

export interface NotificationGoalDto extends NotificationBase {
  tmpl: 'goal'
  details: {
    id: number
    day: number
    user: UserBaseDto
  }
}

export type NotificationDto = NotificationGoalDto
