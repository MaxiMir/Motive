import { UserBaseDto } from './user'

export enum MessageType {
  QUESTION = 'question',
  ANSWER = 'answer',
  SUPPORT = 'support',
}

export interface CreateMessageDto {
  dayId: number
  text: string
  topicId?: number
  type: MessageType
}

export interface UpdateMessageDto {
  text: string
}

export interface MessageDto {
  id: number
  date: string
  text: string
  user: UserBaseDto
  like?: boolean
  likeCount: number
  goalId: number
  dayId: number
  parentId: number | null
  type: MessageType
  edited: boolean
}

export interface TopicDto extends MessageDto {
  type: MessageType
  answer: MessageDto | null
}
