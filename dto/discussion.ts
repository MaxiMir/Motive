import { UserBaseDto } from './user'
import { DataWithPagination } from './page'

export enum TopicType {
  QUESTION = 'question',
  SUPPORT = 'support',
}

export interface TopicCreationDto {
  dayId: number
  text: string
  answer?: number
  type: TopicType
}

export interface TopicBaseDto {
  id: number
  date: string
  text: string
  user: UserBaseDto
  likes: number[]
}

export interface TopicDto extends TopicBaseDto {
  type: TopicType
  answers: TopicBaseDto[] | null
}

export type DiscussionDto = DataWithPagination<TopicDto[]>
