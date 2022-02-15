import { UserBaseDto } from './user'

export enum MessageType {
  QUESTION = 'question',
  ANSWER = 'answer',
  SUPPORT = 'support',
}

export interface TopicCreationDto {
  dayId: number
  text: string
  topicId?: number
  type: MessageType
}

export interface MessageDto {
  id: number
  date: string
  text: string
  user: UserBaseDto
  like?: boolean
  likeCount: number
  type: MessageType
}

export interface TopicDto extends MessageDto {
  type: MessageType
  answer: MessageDto | null
}
