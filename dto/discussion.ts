import { UserBaseDto } from './user'

export enum TopicType {
  QUESTION = 'question',
  ANSWER = 'answer',
  SUPPORT = 'support',
}

export interface TopicCreationDto {
  dayId: number
  text: string
  topicId?: number
  type: TopicType
}

export interface MessageDto {
  id: number
  date: string
  text: string
  user: UserBaseDto
  like?: boolean
  likeCount: number
  type: TopicType
}

export interface TopicDto extends MessageDto {
  type: TopicType
  answer: MessageDto | null
}
