import { UserBase } from './user'

export interface TopicBase {
  id: string
  date: string
  message: string
  user: UserBase
  like: number
}

export interface TopicWithQuestion extends TopicBase {
  type: 'QUESTION'
  answer: TopicBase | null
}

export interface TopicWithSupport extends TopicBase {
  type: 'SUPPORT'
  answer: null
}

export type Discussion = Array<TopicWithQuestion | TopicWithSupport>
