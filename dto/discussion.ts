import { UserBase } from './user'

export interface Topic {
  id: string
  message: string
  user: UserBase
  like: number
  dislike: number
}

export interface TopicWithQuestion extends Topic {
  type: 'QUESTION'
  answer: Topic | null
}

export interface TopicWithSupport extends Topic {
  type: 'SUPPORT'
  answer: null
}

export type Discussion = Array<TopicWithQuestion | TopicWithSupport>
