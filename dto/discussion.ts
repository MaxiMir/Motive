import { UserBaseDto } from './user'
import { DataWithPagination } from './page'

export interface TopicBaseDto {
  id: number
  date: string
  message: string
  user: UserBaseDto
  like: LikeDto
}

export interface LikeDto {
  active: boolean
  count: number
}

// eslint-disable-next-line no-shadow
export enum TopicType {
  QUESTION = 'question',
  SUPPORT = 'support',
}

export interface TopicDto extends TopicBaseDto {
  type: TopicType.QUESTION | TopicType.SUPPORT
  answer: TopicBaseDto | null
}

export type DiscussionDto = DataWithPagination<TopicDto[]>
