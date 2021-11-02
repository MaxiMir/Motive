import { UserBase } from './user'

interface Message {
  id: string
  message: string
  userId: string
  like: number
  dislike: number
}

export interface MessageWithQuestion extends Message {
  type: 'Q'
  answer?: Message
}

export interface MessageWithSupport extends Message {
  type: 'S'
}

export type Discussion = {
  users: UserBase[]
  messages: Array<MessageWithQuestion | MessageWithSupport>
}
