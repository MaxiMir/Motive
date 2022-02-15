import { UserBaseDto } from './user'

export enum MessageType {
  QUESTION = 'question',
  ANSWER = 'answer',
  SUPPORT = 'support',
}

export interface CreateTopicDto {
  dayId: number
  text: string
  topicId?: number
  type: MessageType
}

export interface TopicUpdateDto {
  id: number
  text: string
}

export interface MessageDto {
  id: number
  date: string
  text: string
  user: UserBaseDto
  like?: boolean
  likeCount: number
  type: MessageType
  edited: boolean
}

export interface TopicDto extends MessageDto {
  type: MessageType
  answer: MessageDto | null
}
