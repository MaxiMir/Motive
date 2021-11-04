import { UserBase } from './user'

interface Message {
  id: string
  message: string
  userId: string
  like: number
  dislike: number
}

export interface TopicWithQuestion extends Message {
  type: 'QUESTION'
  answer: Message | null
}

export interface TopicWithSupport extends Message {
  type: 'SUPPORT'
  answer: null
}

export type Discussion = {
  users: UserBase[]
  topics: Array<TopicWithQuestion | TopicWithSupport>
}
