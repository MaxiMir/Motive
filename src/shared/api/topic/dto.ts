import { UserBaseDto } from '../user'

const TOPIC_TYPES = ['question', 'answer', 'support'] as const
export type TopicType = (typeof TOPIC_TYPES)[number]

export interface CreateTopicDto {
  readonly dayId: number
  readonly topicId?: number
  readonly type: TopicType
  readonly text: string
}

export interface UpdateTopicDto {
  readonly text: string
}

export interface MessageDto {
  readonly id: number
  readonly date: string
  readonly text: string
  readonly user: UserBaseDto
  readonly like?: boolean
  readonly likeCount: number
  readonly goalId: number
  readonly dayId: number
  readonly parentId: number | null
  readonly type: TopicType
  readonly edited: boolean
}

export interface TopicDto extends MessageDto {
  readonly type: TopicType
  readonly answer: MessageDto | null
}
