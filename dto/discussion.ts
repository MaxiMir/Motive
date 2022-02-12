import { UserBaseDto } from './user'

export enum TopicType {
  QUESTION = 'question',
  ANSWER = 'answer',
  SUPPORT = 'support',
}

export interface TopicCreationDto {
  dayID: number
  text: string
  topicID?: number
  type: TopicType
}

export interface TopicBaseDto {
  id: number
  date: string
  text: string
  user: UserBaseDto
  like?: boolean
  likeCount: number
}

export interface TopicDto extends TopicBaseDto {
  type: TopicType
  answer: TopicBaseDto | null
}
