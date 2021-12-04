import { UserBase } from './user'
import { DataWithPagination } from './page'

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

export interface Topic extends TopicBase {
  type: TopicType.QUESTION | TopicType.SUPPORT
  answer: TopicBase | null
}

export type Discussion = DataWithPagination<Topic[]>
