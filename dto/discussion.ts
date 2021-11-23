import { UserBase } from './user'

export interface TopicBase {
  id: string
  date: string
  message: string
  user: UserBase
  like: Like
}

export interface Like {
  active: boolean
  count: number
}

// eslint-disable-next-line no-shadow
export enum TopicType {
  QUESTION = 'question',
  SUPPORT = 'support',
}

export interface TopicWithQuestion extends TopicBase {
  type: TopicType.QUESTION
  answer: TopicBase | null
}

export interface TopicWithSupport extends TopicBase {
  type: TopicType.SUPPORT
  answer: null
}

export type Topic = TopicWithQuestion | TopicWithSupport

export type Discussion = Array<Topic>
