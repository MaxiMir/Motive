import { UserBaseDto } from './user'
import { DataWithPagination } from './page'

export interface TopicCreationDto {
  dayId: number
  message: string
  type: TopicType
}

export interface TopicBaseDto {
  id: number
  date: string
  message: string
  user: UserBaseDto
  likes: number[]
}

export enum TopicType {
  QUESTION = 'question',
  SUPPORT = 'support',
}

export interface TopicDto extends TopicBaseDto {
  type: TopicType.QUESTION | TopicType.SUPPORT
  answer: TopicBaseDto | null
}

export type DiscussionDto = DataWithPagination<TopicDto[]>
